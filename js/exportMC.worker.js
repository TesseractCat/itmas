import { MagicaVoxel } from './vox.js';
import { MarchingCubes } from 'three/addons/objects/MarchingCubes.js';
import { MeshBasicMaterial } from 'three';

let voxInstance = null;
let processedLayers = 0;
let totalLayers = 0;

const DEFAULT_RESOLUTION = 64;
const DEFAULT_MAX_POLYCOUNT_FACTOR = 6;
const GLTF_COMPONENT_TYPE_FLOAT = 5126;
const GLTF_TARGET_ARRAY_BUFFER = 34962;

self.addEventListener('message', (event) => {
    const payload = event.data;
    if (!payload)
        return;

    switch (payload.type) {
        case 'init':
            voxInstance = new MagicaVoxel();
            processedLayers = 0;
            totalLayers = payload.totalLayers ?? 256;
            break;
        case 'layer':
            handleLayer(payload);
            break;
        case 'finalize':
            finalizeMarchingCubes(payload);
            break;
    }
});

function handleLayer(payload) {
    if (!voxInstance)
        return;

    const width = payload.width ?? 256;
    const height = payload.height ?? 256;
    const pixels = new Uint8ClampedArray(payload.pixels);
    const stride = width * height;

    for (let i = 0; i < stride; i++) {
        const alpha = pixels[(i * 4) + 3];
        if (alpha <= 128)
            continue;
        const x = i % width;
        const y = Math.floor(i / width);
        const color =
            (pixels[(i * 4) + 0] << 24) |
            (pixels[(i * 4) + 1] << 16) |
            (pixels[(i * 4) + 2] << 8) |
            alpha;
        voxInstance.addVoxel([x, y, payload.layer], color);
    }

    processedLayers++;
    const percent = totalLayers > 0 ? Math.round((processedLayers / totalLayers) * 100) : 100;
    self.postMessage({ type: 'progress', percent });
}

function finalizeMarchingCubes(payload) {
    if (!voxInstance)
        return;

    try {
        const resolution = clamp(Math.floor(payload.resolution ?? DEFAULT_RESOLUTION), 8, 256);
        const isolation = typeof payload.isolation === 'number' ? payload.isolation : 0.5;
        const blurIterations = clamp(Math.floor(payload.blurIterations ?? 1), 0, 5);
        const maxPolyCount = Math.max(1, Math.floor(payload.maxPolyCount ?? (resolution ** 2 * DEFAULT_MAX_POLYCOUNT_FACTOR)));
        const filename = payload.filename ?? 'export.gltf';

        const blob = buildMarchingCubesGltf({
            resolution,
            isolation,
            blurIterations,
            maxPolyCount,
        });

        self.postMessage({
            type: 'done',
            blob,
            filename,
        });
    } finally {
        voxInstance = null;
        processedLayers = 0;
        totalLayers = 0;
    }
}

function buildMarchingCubesGltf({ resolution, isolation, blurIterations, maxPolyCount }) {
    const material = new MeshBasicMaterial({ vertexColors: true });
    const enableUvs = false;
    const enableColors = true;
    const marching = new MarchingCubes(resolution, material, enableUvs, enableColors, maxPolyCount);
    marching.isolation = isolation;

    populateFieldFromVoxels(marching, voxInstance);

    for (let i = 0; i < blurIterations; i++)
        marching.blur();

    marching.update();

    const vertexCount = marching.count;
    const usedFloats = vertexCount * 3;
    const positions = marching.positionArray.slice(0, usedFloats);
    const normals = marching.normalArray.slice(0, usedFloats);
    const colors = marching.enableColors ? marching.colorArray.slice(0, usedFloats) : null;

    return buildGltfBlob({ positions, normals, colors });
}

function populateFieldFromVoxels(marching, voxData) {
    const field = marching.field;
    const paletteField = marching.palette;
    const cellWeights = new Float32Array(field.length);
    const voxels = voxData?.voxels ?? [];
    const palette = voxData?.palette ?? [];

    if (!voxels.length)
        return;

    const size = marching.size;
    const clampIndex = (value) => Math.max(1, Math.min(size - 2, value));
    const scaler = (size - 1) / 255;

    for (let i = 0; i < voxels.length; i += 4) {
        const vx = voxels[i + 0];
        const vy = voxels[i + 1];
        const vz = voxels[i + 2];
        const paletteIndex = voxels[i + 3] - 1;
        if (paletteIndex < 0 || paletteIndex >= palette.length)
            continue;

        const ix = clampIndex(Math.round(vx * scaler));
        const iy = clampIndex(Math.round(vy * scaler));
        const iz = clampIndex(Math.round(vz * scaler));
        const cellIndex = (iz * size * size) + (iy * size) + ix;

        const rgba = palette[paletteIndex];
        const r = ((rgba >>> 24) & 0xff) / 255;
        const g = ((rgba >>> 16) & 0xff) / 255;
        const b = ((rgba >>> 8) & 0xff) / 255;
        const a = (rgba & 0xff) / 255;
        const weight = a > 0 ? a : 1;

        field[cellIndex] = Math.min(field[cellIndex] + weight, 255);
        paletteField[(cellIndex * 3) + 0] += r * weight;
        paletteField[(cellIndex * 3) + 1] += g * weight;
        paletteField[(cellIndex * 3) + 2] += b * weight;
        cellWeights[cellIndex] += weight;
    }

    for (let i = 0; i < cellWeights.length; i++) {
        const weight = cellWeights[i];
        if (weight <= 0)
            continue;
        const base = i * 3;
        paletteField[base + 0] /= weight;
        paletteField[base + 1] /= weight;
        paletteField[base + 2] /= weight;
    }
}

function buildGltfBlob({ positions, normals, colors }) {
    const vertexCount = positions.length / 3;

    const positionArray = new Float32Array(positions);
    const normalArray = new Float32Array(normals);

    const hasColors = colors !== undefined && colors.length === positions.length;
    const colorArray = hasColors ? new Float32Array(colors) : null;

    if (hasColors) {
        for (let i = 0; i < colorArray.length; i++)
            colorArray[i] = clamp(colorArray[i], 0, 1);
    }

    const buffers = [];
    const bufferViews = [];
    const accessors = [];

    function pushBufferView(array) {
        const bufferIndex = buffers.length;
        const byteLength = array.byteLength;
        const bytes = new Uint8Array(array.buffer, array.byteOffset ?? 0, byteLength);
        const base64 = arrayBufferToBase64(bytes);
        buffers.push({ byteLength, uri: `data:application/octet-stream;base64,${base64}` });
        bufferViews.push({
            buffer: bufferIndex,
            byteOffset: 0,
            byteLength,
            target: GLTF_TARGET_ARRAY_BUFFER,
        });
        return bufferViews.length - 1;
    }

    const positionViewIndex = pushBufferView(positionArray);
    const normalViewIndex = pushBufferView(normalArray);
    const colorViewIndex = hasColors ? pushBufferView(colorArray) : null;

    const positionAccessorIndex = accessors.length;
    accessors.push(createAccessor(vertexCount, positionViewIndex, 3));

    const normalAccessorIndex = accessors.length;
    accessors.push(createAccessor(vertexCount, normalViewIndex, 3));

    let colorAccessorIndex = null;
    if (hasColors) {
        colorAccessorIndex = accessors.length;
        accessors.push(createAccessor(vertexCount, colorViewIndex, 3));
    }

    const gltf = {
        asset: { version: "2.0", generator: "Itmas-ExportMC" },
        scenes: [{ nodes: [0] }],
        scene: 0,
        nodes: [{ mesh: 0 }],
        meshes: [{
            primitives: [{
                attributes: {
                    POSITION: positionAccessorIndex,
                    NORMAL: normalAccessorIndex,
                    ...(hasColors ? { COLOR_0: colorAccessorIndex } : {}),
                },
                mode: 4,
            }]
        }],
        accessors,
        bufferViews,
        buffers,
    };

    const gltfJson = JSON.stringify(gltf);
    return new Blob([gltfJson], { type: 'application/json' });
}

function createAccessor(count, bufferViewIndex, numComponents) {
    return {
        bufferView: bufferViewIndex,
        byteOffset: 0,
        componentType: GLTF_COMPONENT_TYPE_FLOAT,
        count,
        type: numComponents === 3 ? 'VEC3' : numComponents === 2 ? 'VEC2' : 'SCALAR',
    };
}

function arrayBufferToBase64(buffer) {
    if (buffer instanceof ArrayBuffer)
        buffer = new Uint8Array(buffer);

    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++)
        binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
