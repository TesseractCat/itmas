self.onmessage = (e) => {
    const { buffer, width, height, layer } = e.data;
    const pixels = new Uint8ClampedArray(buffer);   // ImageData.data from main thread
    const pixelCount = width * height;
    const output = new Uint16Array(pixelCount);    // Packed values

    // Inline pack function
    for (let i = 0; i < pixelCount; i++) {
        const base = i * 4;
        const r = pixels[base];
        const g = pixels[base + 1];
        const b = pixels[base + 2];
        const a = pixels[base + 3];

        let packed = 0;
        if (a !== 0) {
            const r5 = (r >> 3) & 0x1F;
            const g6 = (g >> 2) & 0x3F;
            const b5 = (b >> 3) & 0x1F;
            packed = (r5 << 11) | (g6 << 5) | b5;
            if (packed === 0) packed = 1;
        }

        output[i] = packed;
    }

    // Return packed buffer
    self.postMessage({ output: output.buffer, layer }, [output.buffer]);
};