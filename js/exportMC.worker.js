import { polygonise } from './marchingCubes.js';

let densityField = null;
let colorField = null;
let processedLayers = 0;
let totalLayers = 0;
let fieldResolution = 0;

const DEFAULT_RESOLUTION = 256;
const DEFAULT_BLUR_RADIUS = 2;
const DEFAULT_BLUR_ITERATIONS = 1;
const DEFAULT_ISOLATION = 0.5;

self.addEventListener('message', (event) => {
    const payload = event.data;
    if (!payload)
        return;

    switch (payload.type) {
        case 'init':
            initializeField(payload);
            break;
        case 'layer':
            handleLayer(payload);
            break;
        case 'finalize':
            finalizeField(payload);
            break;
    }
});

function initializeField(payload) {
    fieldResolution = clamp(Math.floor(payload.resolution ?? DEFAULT_RESOLUTION), 8, 256);
    const length = fieldResolution * fieldResolution * fieldResolution;
    densityField = new Float32Array(length);
    colorField = new Uint8Array(length * 4);
    processedLayers = 0;
    totalLayers = payload.totalLayers ?? fieldResolution;
    postProgress(0, "init");
}

function handleLayer(payload) {
    if (!densityField)
        return;

    const width = payload.width ?? fieldResolution;
    const height = payload.height ?? fieldResolution;
    const pixels = new Uint8ClampedArray(payload.pixels);
    const stride = width * height;

    for (let i = 0; i < stride; i++) {
        const alpha = pixels[(i * 4) + 3];
        if (alpha <= 128)
            continue;
        const x = i % width;
        const y = Math.floor(i / width);
        const z = payload.layer;
        if (x >= fieldResolution || y >= fieldResolution || z >= fieldResolution)
            continue;
        const weight = alpha / 255;
        const index = (z * fieldResolution * fieldResolution) + (y * fieldResolution) + x;
        const nextDensity = Math.min(densityField[index] + weight, 1);
        densityField[index] = nextDensity;

        const colorIndex = index * 4;
        if (alpha > colorField[colorIndex + 3]) {
            colorField[colorIndex + 0] = pixels[(i * 4) + 0];
            colorField[colorIndex + 1] = pixels[(i * 4) + 1];
            colorField[colorIndex + 2] = pixels[(i * 4) + 2];
            colorField[colorIndex + 3] = alpha;
        }
    }

    processedLayers++;
    const percent = totalLayers > 0 ? Math.round((processedLayers / totalLayers) * 100) : 100;
    postProgress(percent/25, "layers");
}

function finalizeField(payload) {
    if (!densityField)
        return;

    try {
        const blurRadius = clamp(Math.floor(payload.blurRadius ?? DEFAULT_BLUR_RADIUS), 0, 8);
        const blurIterations = clamp(Math.floor(payload.blurIterations ?? DEFAULT_BLUR_ITERATIONS), 0, 8);
        const isolation = typeof payload.isolation === 'number' ? payload.isolation : DEFAULT_ISOLATION;
        const filename = payload.filename ?? 'export.obj';

        if (blurRadius > 0 && blurIterations > 0) {
            applyBoxBlur(densityField, fieldResolution, blurRadius, blurIterations);
        } else {
            postProgress(75, "blur");
        }

        const objText = buildObjFromField(
            densityField,
            colorField,
            fieldResolution,
            isolation
        );

        postProgress(100, "finalize");
        self.postMessage({
            type: 'done',
            filename,
            blob: new Blob([objText], { type: 'text/plain' }),
        });
    } finally {
        densityField = null;
        colorField = null;
        processedLayers = 0;
        totalLayers = 0;
        fieldResolution = 0;
    }
}

function applyBoxBlur(density, resolution, radius, iterations) {
    const length = density.length;
    const scratchDensity = new Float32Array(length);
    
    // A separable box blur implies a cubic neighborhood. 
    // The total volume evaluated is (2r + 1)^3.
    const windowSize = radius * 2 + 1;
    const volume = windowSize * windowSize * windowSize;
    const scale = 1 / volume;

    const res = resolution;
    const res2 = res * res;

    // Helper function to perform a 1D sliding window blur pass
    function blurPass(src, dst, stride, stepA, stepB, passScale) {
        for (let a = 0; a < res; a++) {
            for (let b = 0; b < res; b++) {
                const startIdx = a * stepA + b * stepB;
                let sum = 0;

                // 1. Initialize the sliding window sum (from -radius to radius)
                for (let i = -radius; i <= radius; i++) {
                    if (i >= 0 && i < res) {
                        sum += src[startIdx + i * stride];
                    }
                }

                // 2. Slide the window across the axis
                for (let i = 0; i < res; i++) {
                    // Write the averaged result
                    dst[startIdx + i * stride] = sum * passScale;

                    // Calculate indices for the element leaving and entering the window
                    const leaving = i - radius;
                    const entering = i + radius + 1;

                    // Subtract the value that falls out of the window
                    if (leaving >= 0) {
                        sum -= src[startIdx + leaving * stride];
                    }
                    // Add the new value that enters the window
                    if (entering < res) {
                        sum += src[startIdx + entering * stride];
                    }
                }
            }
        }
    }

    const reportProgress = (iter, fraction) => {
        const iterationPercent = ((iter + fraction) / Math.max(1, iterations)) * 100;
        postProgress(Math.min(75, iterationPercent * 0.5 + 25), "blur");
    };

    for (let iteration = 0; iteration < iterations; iteration++) {
        // Pass 1: Blur along X-axis
        // stride = 1 (X), stepA = res (Y), stepB = res2 (Z)
        blurPass(density, scratchDensity, 1, res, res2, 1);
        reportProgress(iteration, 0.33);

        // Pass 2: Blur along Y-axis
        // stride = res (Y), stepA = 1 (X), stepB = res2 (Z)
        // Note: Safe to overwrite `density` here because Pass 1 data is safe in `scratchDensity`
        blurPass(scratchDensity, density, res, 1, res2, 1);
        reportProgress(iteration, 0.67);

        // Pass 3: Blur along Z-axis
        // stride = res2 (Z), stepA = 1 (X), stepB = res (Y)
        blurPass(density, scratchDensity, res2, 1, res, scale);
        reportProgress(iteration, 1.0);

        // Synchronize buffers for the next iteration / final output
        density.set(scratchDensity);
    }
}

function buildObjFromField(density, colors, resolution, isolevel) {
    const vertices = [];
    const faces = [];
    const vertCache = new Map();

    function keyForVertex(v, color) {
        return `${v.x.toFixed(5)}:${v.y.toFixed(5)}:${v.z.toFixed(5)}:${color.r.toFixed(4)}:${color.g.toFixed(4)}:${color.b.toFixed(4)}`;
    }

    function addVertex(v, color) {
        const key = keyForVertex(v, color);
        const existing = vertCache.get(key);
        if (existing)
            return existing;
        const index = vertices.length + 1;
        vertices.push(
            `v ${v.x.toFixed(5)} ${v.y.toFixed(5)} ${v.z.toFixed(5)} ${color.r.toFixed(4)} ${color.g.toFixed(4)} ${color.b.toFixed(4)}`
        );
        vertCache.set(key, index);
        return index;
    }

    function sampleIndex(ix, iy, iz) {
        return (iz * resolution * resolution) + (iy * resolution) + ix;
    }

    function sampleDensity(ix, iy, iz) {
        if (ix < 0 || iy < 0 || iz < 0 || ix >= resolution || iy >= resolution || iz >= resolution)
            return 0;
        return density[sampleIndex(ix, iy, iz)];
    }

    function sampleColorStochastic(x, y, z, maxSteps = 32) {
        const ix = clamp(Math.round(x), 0, resolution - 1);
        const iy = clamp(Math.round(y), 0, resolution - 1);
        const iz = clamp(Math.round(z), 0, resolution - 1);

        const startIndex = sampleIndex(ix, iy, iz);
        if (colors[(startIndex * 4) + 3] > 0) {
            return {
                r: colors[(startIndex * 4) + 0] / 255,
                g: colors[(startIndex * 4) + 1] / 255,
                b: colors[(startIndex * 4) + 2] / 255,
            };
        }

        for (let step = 1; step <= maxSteps; step++) {
            const distance = step;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const dx = Math.round(distance * Math.sin(phi) * Math.cos(theta));
            const dy = Math.round(distance * Math.sin(phi) * Math.sin(theta));
            const dz = Math.round(distance * Math.cos(phi));

            const nx = clamp(ix + dx, 0, resolution - 1);
            const ny = clamp(iy + dy, 0, resolution - 1);
            const nz = clamp(iz + dz, 0, resolution - 1);
            const index = sampleIndex(nx, ny, nz);
            if (colors[(index * 4) + 3] <= 0)
                continue;
            return {
                r: colors[(index * 4) + 0] / 255,
                g: colors[(index * 4) + 1] / 255,
                b: colors[(index * 4) + 2] / 255,
            };
        }

        return { r: 0, g: 0, b: 0 };
    }

    for (let z = 0; z < resolution - 1; z++) {
        for (let y = 0; y < resolution - 1; y++) {
            for (let x = 0; x < resolution - 1; x++) {
                const grid = {
                    p: [
                        { x, y, z },
                        { x: x + 1, y, z },
                        { x: x + 1, y: y + 1, z },
                        { x, y: y + 1, z },
                        { x, y, z: z + 1 },
                        { x: x + 1, y, z: z + 1 },
                        { x: x + 1, y: y + 1, z: z + 1 },
                        { x, y: y + 1, z: z + 1 },
                    ],
                    val: [
                        sampleDensity(x, y, z),
                        sampleDensity(x + 1, y, z),
                        sampleDensity(x + 1, y + 1, z),
                        sampleDensity(x, y + 1, z),
                        sampleDensity(x, y, z + 1),
                        sampleDensity(x + 1, y, z + 1),
                        sampleDensity(x + 1, y + 1, z + 1),
                        sampleDensity(x, y + 1, z + 1),
                    ],
                };

                const triangles = polygonise(grid, isolevel);
                if (!triangles.length)
                    continue;

                for (const tri of triangles) {
                    const indices = tri.map((v) => {
                        const color = sampleColorStochastic(v.x, v.y, v.z);
                        return addVertex(v, color);
                    });
                    faces.push(`f ${indices[0]} ${indices[1]} ${indices[2]}`);
                }
            }
        }
        const mcPercent = 75 + Math.round(((z + 1) / Math.max(1, resolution - 1)) * 25);
        postProgress(Math.min(99, mcPercent), "marching");
    }

    return `${vertices.join('\n')}\n${faces.join('\n')}\n`;
}

function buildOffsets(radius) {
    const offsets = [];
    for (let dz = -radius; dz <= radius; dz++) {
        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                offsets.push([dx, dy, dz]);
            }
        }
    }
    return offsets;
}

function postProgress(percent, stage) {
    const safePercent = clamp(Math.round(percent), 0, 100);
    self.postMessage({ type: 'progress', percent: safePercent, stage });
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
