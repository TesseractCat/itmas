import { MagicaVoxel } from './vox.js';

let voxInstance = null;
let processedLayers = 0;
let totalLayers = 0;

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
        case 'layer': {
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
            break;
        }
        case 'finalize':
            if (!voxInstance)
                return;
            const blob = voxInstance.toBlob();
            self.postMessage({ type: 'done', blob, filename: payload.filename ?? 'export.vox' });
            voxInstance = null;
            processedLayers = 0;
            totalLayers = 0;
            break;
    }
});
