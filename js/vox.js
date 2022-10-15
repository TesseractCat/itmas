// https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt

function toBytesInt32(num, littleEndian = true) {
    let arr = new ArrayBuffer(4);
    let view = new DataView(arr);
    view.setInt32(0, num, littleEndian);
    return new Uint8Array(arr);
}
function toBytesUint32(num, littleEndian = true) {
    let arr = new ArrayBuffer(4);
    let view = new DataView(arr);
    view.setUint32(0, num, littleEndian);
    return new Uint8Array(arr);
}
function toBytesUint8(num) {
    return new Uint8Array([num]);
}
function stringToBytes(str) {
    return Uint8Array.from(str.split("").map(x => x.charCodeAt()));
}

export class MagicaVoxel {
    palette = [];
    voxels = [];

    constructor() { }

    addVoxel(point, color) {
        let index = this.palette.indexOf(color);
        if (index == -1) {
            index = this.palette.length;
            this.palette.push(color);
        }
        this.voxels.push(
            point[0], point[1], point[2], (index + 1)
        );
    }
    toBlob() {
        let main = this.MAIN();
        let header = new Uint8Array(8);
        header.set(stringToBytes('VOX '), 0);
        header.set(toBytesInt32(150), 4);

        return new Blob([header, main]);
    }

    MAIN() {
        let s = this.SIZE();
        let x = this.XYZI();
        let r = this.RGBA();
        let merged = new Uint8Array(s.length + x.length + r.length);
        merged.set(s);
        merged.set(x, s.length);
        merged.set(r, s.length + x.length);

        return this.createChunk('MAIN', [], merged);
    }
    SIZE() {
        let content = new Uint8Array(12);
        content.set(toBytesInt32(256), 0);
        content.set(toBytesInt32(256), 4);
        content.set(toBytesInt32(256), 8);
        return this.createChunk('SIZE', content);
    }
    XYZI() {
        let content = new Uint8Array(this.voxels.length + 4);
        content.set(toBytesInt32(this.voxels.length/4), 0);
        content.set(this.voxels, 4);
        return this.createChunk('XYZI', content);
    }
    RGBA() {
        let content = new Uint8Array(256 * 4);
        for (let i = 0; i < this.palette.length; i++) {
            content.set(toBytesUint32(this.palette[i], false), i * 4);
        }
        return this.createChunk('RGBA', content);
    }

    createChunk(id, content = [], childContent = []) {
        let length = 4 * 3 + content.length + childContent.length;
        let chunk = new Uint8Array(length);

        chunk.set(stringToBytes(id), 0);
        chunk.set(toBytesInt32(content.length), 4);
        chunk.set(toBytesInt32(childContent.length), 8);
        chunk.set(content, 12);
        chunk.set(childContent, 12 + content.length);

        return chunk;
    }
}
