import { polygonise } from './marchingCubes.js';
import JSZip from 'jszip';

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
    postProgress(percent / 25, "layers");
}

async function finalizeField(payload) {
    if (!densityField)
        return;

    try {
        const blurRadius = clamp(Math.floor(payload.blurRadius ?? DEFAULT_BLUR_RADIUS), 0, 8);
        const blurIterations = clamp(Math.floor(payload.blurIterations ?? DEFAULT_BLUR_ITERATIONS), 0, 8);
        const isolation = typeof payload.isolation === 'number' ? payload.isolation : DEFAULT_ISOLATION;
        const useTexture = Boolean(payload.useTexture); // Determine mode
        
        const baseFilename = payload.filename ?? 'export';

        if (blurRadius > 0 && blurIterations > 0) {
            applyBoxBlur(densityField, fieldResolution, blurRadius, blurIterations);
        } else {
            postProgress(75, "blur");
        }

        const result = buildObjFromField(
            densityField,
            colorField,
            fieldResolution,
            isolation,
            baseFilename,
            useTexture
        );

        let textureBlob = null;
        let mtlBlob = null;

        // If texture mode is enabled, generate the image/mtl blobs
        if (result.useTexture) {
            if (typeof OffscreenCanvas !== 'undefined') {
                const canvas = new OffscreenCanvas(result.texture.width, result.texture.height);
                const ctx = canvas.getContext('2d');
                const imgData = new ImageData(result.texture.pixels, result.texture.width, result.texture.height);
                ctx.putImageData(imgData, 0, 0);
                textureBlob = await canvas.convertToBlob({ type: 'image/png' });
            }
            mtlBlob = new Blob([result.mtlText], { type: 'text/plain' });
        }

        postProgress(100, "finalize");
        
        // Prepare base response
        if (!result.useTexture) {
            const response = {
                type: 'done',
                filename: `${baseFilename}.obj`,
                blob: new Blob([result.objText], { type: 'text/plain' }),
                useTexture: result.useTexture
            };
            self.postMessage(response);
        } else {
            let zip = new JSZip();
            zip.file("model.obj", new Blob([result.objText], { type: 'text/plain' }));
            zip.file("model.mtl", new Blob([result.mtlText], { type: 'text/plain' }));
            zip.file("palette.png", new Blob([textureBlob], { type: 'image/png' }));
            zip.generateAsync({type:"blob"}).then(async (blob) => {
                const response = {
                    type: 'done',
                    filename: `${baseFilename}.zip`,
                    blob: blob,
                };
                self.postMessage(response);
            });
        }
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
    
    const windowSize = radius * 2 + 1;
    const volume = windowSize * windowSize * windowSize;
    const scale = 1 / volume;

    const res = resolution;
    const res2 = res * res;

    function blurPass(src, dst, stride, stepA, stepB, passScale) {
        for (let a = 0; a < res; a++) {
            for (let b = 0; b < res; b++) {
                const startIdx = a * stepA + b * stepB;
                let sum = 0;

                for (let i = -radius; i <= radius; i++) {
                    if (i >= 0 && i < res) sum += src[startIdx + i * stride];
                }

                for (let i = 0; i < res; i++) {
                    dst[startIdx + i * stride] = sum * passScale;
                    const leaving = i - radius;
                    const entering = i + radius + 1;
                    if (leaving >= 0) sum -= src[startIdx + leaving * stride];
                    if (entering < res) sum += src[startIdx + entering * stride];
                }
            }
        }
    }

    const reportProgress = (iter, fraction) => {
        const iterationPercent = ((iter + fraction) / Math.max(1, iterations)) * 100;
        postProgress(Math.min(75, iterationPercent * 0.5 + 25), "blur");
    };

    for (let iteration = 0; iteration < iterations; iteration++) {
        blurPass(density, scratchDensity, 1, res, res2, 1);
        reportProgress(iteration, 0.33);

        blurPass(scratchDensity, density, res, 1, res2, 1);
        reportProgress(iteration, 0.67);

        blurPass(density, scratchDensity, res2, 1, res, scale);
        reportProgress(iteration, 1.0);

        density.set(scratchDensity);
    }
}

function buildObjFromField(density, colors, resolution, isolevel, baseFilename, useTexture) {
    const vertices =[];
    const faces =[];
    const vertCache = new Map();
    
    // Texture-specific data structures
    const uniqueColors = [];
    const colorToIndex = new Map();
    const vertexColorIndices =[];

    function getColorIndex(color) {
        const r = clamp(Math.round(color.r * 255), 0, 255);
        const g = clamp(Math.round(color.g * 255), 0, 255);
        const b = clamp(Math.round(color.b * 255), 0, 255);
        const key = `${r},${g},${b}`;
        
        let idx = colorToIndex.get(key);
        if (idx === undefined) {
            idx = uniqueColors.length;
            uniqueColors.push({ r, g, b });
            colorToIndex.set(key, idx);
        }
        return idx;
    }

    function keyForVertex(v, cacheParam) {
        if (useTexture) {
            return `${v.x.toFixed(5)}:${v.y.toFixed(5)}:${v.z.toFixed(5)}:${cacheParam}`; // cacheParam is colorIdx
        } else {
            return `${v.x.toFixed(5)}:${v.y.toFixed(5)}:${v.z.toFixed(5)}:${cacheParam.r.toFixed(4)}:${cacheParam.g.toFixed(4)}:${cacheParam.b.toFixed(4)}`;
        }
    }

    function addVertex(v, color) {
        const cacheParam = useTexture ? getColorIndex(color) : color;
        const key = keyForVertex(v, cacheParam);
        
        const existing = vertCache.get(key);
        if (existing) return existing;
        
        const index = vertices.length + 1;
        
        if (useTexture) {
            vertices.push(`v ${v.x.toFixed(5)} ${v.z.toFixed(5)} ${v.y.toFixed(5)}`);
            vertexColorIndices.push(cacheParam);
        } else {
            // Standard Vertex Colors
            vertices.push(`v ${v.x.toFixed(5)} ${v.z.toFixed(5)} ${v.y.toFixed(5)} ${color.r.toFixed(4)} ${color.g.toFixed(4)} ${color.b.toFixed(4)}`);
        }
        
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

    function vertexFromCell(cell, index) {
        const x = cell.x + (index & 1);
        const y = cell.y + ((index & 2) >> 1);
        const z = cell.z + ((index & 4) >> 2);
        return { x, y, z };
    }

    function sampleColorAtIndex(ix, iy, iz) {
        if (ix < 0 || iy < 0 || iz < 0 || ix >= resolution || iy >= resolution || iz >= resolution) {
            return null;
        }

        const index = sampleIndex(ix, iy, iz) * 4;
        if (colors[index + 3] <= 0)
            return null;

        return {
            r: colors[index + 0] / 255,
            g: colors[index + 1] / 255,
            b: colors[index + 2] / 255,
        };
    }

    function sampleColorStochastic(x, y, z, maxSteps = 32) {
        const ix = clamp(Math.round(x), 0, resolution - 1);
        const iy = clamp(Math.round(y), 0, resolution - 1);
        const iz = clamp(Math.round(z), 0, resolution - 1);

        const startColor = sampleColorAtIndex(ix, iy, iz);
        if (startColor)
            return startColor;

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
            const color = sampleColorAtIndex(nx, ny, nz);
            if (color)
                return color;
        }

        return null;
    }

    function sampleNormalFinite(x, y, z) {
        const ix = clamp(Math.round(x), 0, resolution - 1);
        const iy = clamp(Math.round(y), 0, resolution - 1);
        const iz = clamp(Math.round(z), 0, resolution - 1);

        const dx = sampleDensity(ix + 1, iy, iz) - sampleDensity(ix - 1, iy, iz);
        const dy = sampleDensity(ix, iy + 1, iz) - sampleDensity(ix, iy - 1, iz);
        const dz = sampleDensity(ix, iy, iz + 1) - sampleDensity(ix, iy, iz - 1);

        const length = Math.hypot(dx, dy, dz);
        if (length < 1e-5)
            return null;

        return { x: dx / length, y: dy / length, z: dz / length };
    }

    function sampleColorInward(x, y, z, maxSteps = 32, stepSize = 0.5) {
        const ix = clamp(Math.round(x), 0, resolution - 1);
        const iy = clamp(Math.round(y), 0, resolution - 1);
        const iz = clamp(Math.round(z), 0, resolution - 1);

        const startColor = sampleColorAtIndex(ix, iy, iz);
        if (startColor)
            return startColor;

        const normal = sampleNormalFinite(x, y, z);
        if (!normal)
            return null;

        let px = x;
        let py = y;
        let pz = z;

        for (let step = 0; step < maxSteps; step++) {
            px += normal.x * stepSize;
            py += normal.y * stepSize;
            pz += normal.z * stepSize;

            const nx = Math.round(px);
            const ny = Math.round(py);
            const nz = Math.round(pz);

            const color = sampleColorAtIndex(nx, ny, nz);
            if (color)
                return color;
        }

        return null;
    }

    function sampleColorWithFallback(x, y, z) {
        const inward = sampleColorInward(x, y, z);
        if (inward)
            return inward;
        return sampleColorStochastic(x, y, z) ?? { r: 0, g: 0, b: 0 };
    }

    for (let z = -1; z < resolution; z++) {
        for (let y = -1; y < resolution; y++) {
            for (let x = -1; x < resolution; x++) {
                const cell = { x, y, z };
                const grid = {
                    p:[
                        vertexFromCell(cell, 0), vertexFromCell(cell, 1),
                        vertexFromCell(cell, 3), vertexFromCell(cell, 2),
                        vertexFromCell(cell, 4), vertexFromCell(cell, 5),
                        vertexFromCell(cell, 7), vertexFromCell(cell, 6),
                    ],
                    val:[
                        sampleDensity(x, y, z), sampleDensity(x + 1, y, z),
                        sampleDensity(x + 1, y + 1, z), sampleDensity(x, y + 1, z),
                        sampleDensity(x, y, z + 1), sampleDensity(x + 1, y, z + 1),
                        sampleDensity(x + 1, y + 1, z + 1), sampleDensity(x, y + 1, z + 1),
                    ],
                };

                const triangles = polygonise(grid, isolevel);
                if (!triangles.length) continue;

                const faceColor = sampleColorWithFallback(
                    (cell.x + 0.5),
                    (cell.y + 0.5),
                    (cell.z + 0.5)
                );

                for (const tri of triangles) {
                    let indices = [];
                    if (useTexture) {
                        indices = tri.map((v) => addVertex(v, faceColor));
                    } else {
                        indices = tri.map((v) => addVertex(v, faceColor));
                    }

                    if (useTexture) {
                        faces.push(`f ${indices[0]}/${indices[0]} ${indices[1]}/${indices[1]} ${indices[2]}/${indices[2]}`);
                    } else {
                        faces.push(`f ${indices[0]} ${indices[1]} ${indices[2]}`);
                    }
                }
            }
        }
        const mcPercent = 75 + Math.round(((z + 2) / Math.max(1, resolution + 1)) * 25);
        postProgress(Math.min(99, mcPercent), "marching");
    }

    // --- Output standard format ---
    if (!useTexture) {
        return {
            objText: `${vertices.join('\n')}\n${faces.join('\n')}\n`,
            useTexture: false
        };
    }

    // --- Output Texture/UV mapped format ---
    const numColors = Math.max(1, uniqueColors.length);
    const texSize = Math.max(2, Math.pow(2, Math.ceil(Math.log2(Math.ceil(Math.sqrt(numColors))))));
    
    const uvs =[];
    for (let i = 0; i < vertexColorIndices.length; i++) {
        const colorIdx = vertexColorIndices[i];
        const u = ((colorIdx % texSize) + 0.5) / texSize;
        const v = 1.0 - ((Math.floor(colorIdx / texSize) + 0.5) / texSize); 
        uvs.push(`vt ${u.toFixed(5)} ${v.toFixed(5)}`);
    }

    const texData = new Uint8ClampedArray(texSize * texSize * 4);
    for (let i = 0; i < uniqueColors.length; i++) {
        const idx = i * 4;
        const c = uniqueColors[i];
        texData[idx + 0] = c.r;
        texData[idx + 1] = c.g;
        texData[idx + 2] = c.b;
        texData[idx + 3] = 255;
    }

    const mtlText = `newmtl Default\nKa 1.000 1.000 1.000\nKd 1.000 1.000 1.000\nKs 0.000 0.000 0.000\nmap_Kd palette.png\n`;
    const objText = `mtllib ${baseFilename}.mtl\nusemtl Default\n` + 
                    `${vertices.join('\n')}\n${uvs.join('\n')}\n${faces.join('\n')}\n`;

    return {
        objText,
        mtlText,
        useTexture: true,
        texture: {
            width: texSize,
            height: texSize,
            pixels: texData
        }
    };
}

function buildOffsets(radius) {
    const offsets =[];
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