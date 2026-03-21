import { polygonise } from './marchingCubes.js';

let field = null;
let processedLayers = 0;
let totalLayers = 0;
let fieldResolution = 0;

const DEFAULT_RESOLUTION = 256;
const DEFAULT_BLUR_RADIUS = 3;
const DEFAULT_BLUR_ITERATIONS = 2;
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
    field = new Float32Array(fieldResolution * fieldResolution * fieldResolution);
    processedLayers = 0;
    totalLayers = payload.totalLayers ?? fieldResolution;
}

function handleLayer(payload) {
    if (!field)
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
        field[index] = Math.min(field[index] + weight, 1);
    }

    processedLayers++;
    const percent = totalLayers > 0 ? Math.round((processedLayers / totalLayers) * 100) : 100;
    self.postMessage({ type: 'progress', percent });
}

function finalizeField(payload) {
    if (!field)
        return;

    try {
        const blurRadius = clamp(Math.floor(payload.blurRadius ?? DEFAULT_BLUR_RADIUS), 0, 8);
        const blurIterations = clamp(Math.floor(payload.blurIterations ?? DEFAULT_BLUR_ITERATIONS), 0, 8);
        const isolation = typeof payload.isolation === 'number' ? payload.isolation : DEFAULT_ISOLATION;
        const filename = payload.filename ?? 'export.obj';

        console.log("Blurring...");
        if (blurRadius > 0 && blurIterations > 0)
            applyBoxBlur(field, fieldResolution, blurRadius, blurIterations);

        console.log("Building OBJ...");
        const objText = buildObjFromField(field, fieldResolution, isolation);

        self.postMessage({
            type: 'done',
            filename,
            blob: new Blob([objText], { type: 'text/plain' }),
        });
    } finally {
        field = null;
        processedLayers = 0;
        totalLayers = 0;
        fieldResolution = 0;
    }
}

function applyBoxBlur(field, resolution, radius, iterations) {
    const length = field.length;
    const scratch = new Float32Array(length);
    const offsets = buildOffsets(radius);
    const volume = offsets.length;
    const scale = 1 / volume;

    for (let iteration = 0; iteration < iterations; iteration++) {
        scratch.fill(0);
        for (let z = 0; z < resolution; z++) {
            for (let y = 0; y < resolution; y++) {
                for (let x = 0; x < resolution; x++) {
                    const index = (z * resolution * resolution) + (y * resolution) + x;
                    const value = field[index];
                    if (value <= 0)
                        continue;
                    const contribution = value * scale;
                    for (const offset of offsets) {
                        const nx = x + offset[0];
                        const ny = y + offset[1];
                        const nz = z + offset[2];
                        if (nx < 0 || ny < 0 || nz < 0 || nx >= resolution || ny >= resolution || nz >= resolution)
                            continue;
                        const nextIndex = (nz * resolution * resolution) + (ny * resolution) + nx;
                        scratch[nextIndex] += contribution;
                    }
                }
            }
        }
        field.set(scratch);
    }
}

function buildObjFromField(field, resolution, isolevel) {
    const vertices = [];
    const faces = [];
    const vertCache = new Map();

    function keyForVertex(v) {
        return `${v.x.toFixed(5)}:${v.y.toFixed(5)}:${v.z.toFixed(5)}`;
    }

    function addVertex(v) {
        const key = keyForVertex(v);
        const existing = vertCache.get(key);
        if (existing)
            return existing;
        const index = vertices.length + 1;
        vertices.push(`v ${v.x.toFixed(5)} ${v.y.toFixed(5)} ${v.z.toFixed(5)}`);
        vertCache.set(key, index);
        return index;
    }

    function sample(ix, iy, iz) {
        if (ix < 0 || iy < 0 || iz < 0 || ix >= resolution || iy >= resolution || iz >= resolution)
            return 0;
        return field[(iz * resolution * resolution) + (iy * resolution) + ix];
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
                        sample(x, y, z),
                        sample(x + 1, y, z),
                        sample(x + 1, y + 1, z),
                        sample(x, y + 1, z),
                        sample(x, y, z + 1),
                        sample(x + 1, y, z + 1),
                        sample(x + 1, y + 1, z + 1),
                        sample(x, y + 1, z + 1),
                    ],
                };

                const triangles = polygonise(grid, isolevel);
                if (!triangles.length)
                    continue;

                for (const tri of triangles) {
                    const indices = tri.map(addVertex);
                    faces.push(`f ${indices[0]} ${indices[1]} ${indices[2]}`);
                }
            }
        }
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

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
