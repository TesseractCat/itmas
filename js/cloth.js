import { aliasedLine, aliasedCircle } from './aliased';
import { Texture, DataTexture, Vector2 } from 'three';

export const BrushType = {
    Circle: 'Circle',
    Square: 'Square',
    Fill: 'Fill',
    Erase: 'Erase',
};

function floodFill(ctx, x, y, erase) {
    let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    function hexToUint8Array(rgb) {
        return new Uint8Array([
            parseInt(rgb.substring(1,3), 16),
            parseInt(rgb.substring(3,5), 16),
            parseInt(rgb.substring(5,7), 16),
            255
        ]);
    }
    function getColor(p) {
        return imageData.data.slice(
            (p[1] * ctx.canvas.width + p[0]) * 4,
            ((p[1] * ctx.canvas.width + p[0]) * 4) + 4);
    }
    function setColor(p, c) {
        imageData.data[((p[1] * ctx.canvas.width + p[0]) * 4) + 0] = c[0];
        imageData.data[((p[1] * ctx.canvas.width + p[0]) * 4) + 1] = c[1];
        imageData.data[((p[1] * ctx.canvas.width + p[0]) * 4) + 2] = c[2];
        imageData.data[((p[1] * ctx.canvas.width + p[0]) * 4) + 3] = c[3];
    }
    function compareColors(a, b) {
        return a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3];
    }

    let fillColor = hexToUint8Array(erase ? "#000000" : ctx.fillStyle);
    if (erase)
        fillColor[3] = 0;
    let startColor = getColor([x, y]);

    if (compareColors(fillColor, startColor))
        return;

    let stack = [[x, y]];
    while (stack.length > 0) {
        let next = stack.pop();
        let neighbors = [
            [next[0] - 1, next[1] + 0],
            [next[0] + 1, next[1] + 0],
            [next[0] + 0, next[1] - 1],
            [next[0] + 0, next[1] + 1],
        ];

        for (let neighbor of neighbors) {
            if (neighbor[0] < 0 || neighbor[1] < 0 ||
                neighbor[0] >= ctx.canvas.width ||
                neighbor[1] >= ctx.canvas.width)
                continue;

            if (compareColors(getColor(neighbor), startColor)) {
                stack.push(neighbor);
                setColor(neighbor, fillColor);
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

const brushScale = 10;

const undoAmount = 16;

class UndoManager {
    blobs = [null];
    pointer = 0;

    clear(empty = true) {
        if (empty) {
            this.blobs = [];
            this.pointer = -1;
        } else {
            this.blobs = [null];
            this.pointer = 0;
        }
    }
    latestBlob() {
        if (this.blobs.length == 0) return null;
        return this.blobs[this.blobs.length - 1];
    }
    currentBlob() {
        return this.blobs[this.pointer];
    }
    async push(ctx) {
        const blob = await new Promise(resolve => ctx.canvas.toBlob(resolve));
        this.pointer++;
        // If we undoed back to some point, and now we're pushing new states, remove all invalidated states
        if (this.pointer != this.blobs.length) {
            this.blobs.splice(this.pointer, this.blobs.length - this.pointer);
        }
        // Don't add more than the max
        if (this.blobs.length == undoAmount) {
            this.blobs.splice(0, 1);
            this.pointer = undoAmount - 1;
        }
        this.blobs.push(blob);
        // console.log(this.pointer);
        // console.log(this.blobs);
        console.assert(this.pointer == this.blobs.length - 1);
    }
    async undo(ctx) {
        if (this.pointer <= 0) return;
        this.pointer--;
        // console.log(this.pointer);
        // console.log(this.blobs);
        await this.restore(ctx);
    }
    async redo(ctx) {
        if (this.pointer < this.blobs.length - 1) {
            this.pointer++;
            await this.restore(ctx);
        }
    }
    async restore(ctx) {
        let blob = this.blobs[this.pointer];
        if (blob == null) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        } else {
            let bitmap = await createImageBitmap(blob);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(bitmap, 0, 0);
        }
    }
}

class Cloth extends HTMLElement {
    ctx;
    overlayCtx;

    size;

    color = "rgb(0,0,0)";
    brushSize = 0.5;
    brushStyle = BrushType.Circle;

    textures = Array(4).fill(null).map(() => {
        let t = new DataTexture(
            new Uint8Array(256 * 256 * 4), 256, 256
        );
        t.flipY = true;
        t.needsUpdate = true;
        return t;
    });
    layers = Array(4).fill(null).map(() => new UndoManager());
    layer = 0;

    mouseDown = false;

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.gridResizeObserver = null;

        this.size = 256;
        const canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.width = this.size;
        canvas.height = canvas.width;
        canvas.oncontextmenu = () => {return false;};
        canvas.addEventListener("pointerdown", (e) => this.handleMouseDown(e));
        document.addEventListener("pointermove", (e) => this.handleMouseMove(e));
        document.addEventListener("pointerup", (e) => this.handleMouseUp(e));
        this.ctx = canvas.getContext("2d", {willReadFrequently: true});

        const overlayCanvas = document.createElement("canvas");
        overlayCanvas.id = "overlay";
        overlayCanvas.width = canvas.width;
        overlayCanvas.height = canvas.height;
        this.overlayCtx = overlayCanvas.getContext("2d");
        this.overlayCtx.fillStyle = "black";

        const title = document.createElement("div");
        title.id = "title";
        const titleSlot = document.createElement("slot");
        titleSlot.name = "title";
        titleSlot.textContent = "Placeholder";
        title.append(titleSlot);

        const undoredo = document.createElement("div");
        undoredo.id = "undoredo";

        const undo = document.createElement("div");
        undo.id = "undo";
        undo.textContent = "↶";
        undo.addEventListener("click", async () => {
            await this.layers[this.layer].undo(this.ctx);
            this.invalidate(this.layer);
        });
        undoredo.append(undo);

        const redo = document.createElement("div");
        redo.id = "redo";
        redo.textContent = "↷";
        redo.addEventListener("click", async () => {
            await this.layers[this.layer].redo(this.ctx);
            this.invalidate(this.layer);
        });
        undoredo.append(redo);

        const style = document.createElement("style");
        style.textContent = `
:host {
    --grid-major: 64px;
    --grid-minor: 21.3333px;
    --grid-line-width: 1px;

    transform: scale(1);
    display: block;

    user-select: none;

    background-size: var(--grid-major) var(--grid-major), var(--grid-major) var(--grid-major), var(--grid-minor) var(--grid-minor), var(--grid-minor) var(--grid-minor);
    background-color: #FFF;
    background-image:
        linear-gradient(to right, #aaa var(--grid-line-width), transparent var(--grid-line-width)),
        linear-gradient(to bottom, #aaa var(--grid-line-width), transparent var(--grid-line-width)),
        linear-gradient(to right, #d7d7d7 var(--grid-line-width), transparent var(--grid-line-width)),
        linear-gradient(to bottom, #d7d7d7 var(--grid-line-width), transparent var(--grid-line-width));
}

* {
    box-sizing: border-box;
}

#canvas {
    width: 100%;
    height: 100%;

    image-rendering: pixelated;
    background-color: transparent;
    border: none;
    border-radius: inherit;

}
#title {
    position: absolute;
    top: 10px;
    left: 10px;

    color: var(--canvas-label-color);

    pointer-events: none;
}
#undoredo {
    position: absolute;
    display: flex;
    gap: 5px;

    top: 5px;
    right: 10px;

    font-family: arial;
    color: rgba(0,0,0,0.5);
    font-weight: bold;

    cursor: pointer;
}
#overlay {
    pointer-events: none;

    position: absolute;
    top: 0px;
    left: 0px;

    image-rendering: pixelated;
    border: none;
    border-radius: inherit;

    width: 100%;
    height: 100%;
}
`;

        this.shadowRoot.append(style, canvas, overlayCanvas, title, undoredo);
        this.updateGridScale();
        this.gridResizeObserver = new ResizeObserver(() => this.updateGridScale());
        this.gridResizeObserver.observe(this);
        window.addEventListener("resize", () => this.updateGridScale());
    }

    updateGridScale() {
        const pixelRatio = window.devicePixelRatio || 1;
        const rect = this.getBoundingClientRect();
        if (!rect.width || !rect.height)
            return;
        const minorDevicePixels = Math.round(rect.width * pixelRatio / 12);
        const minorPixels = minorDevicePixels / pixelRatio;
        const majorPixels = (minorDevicePixels * 3) / pixelRatio;
        const lineWidth = 1 / pixelRatio;
        this.style.setProperty("--grid-major", `${majorPixels}px`);
        this.style.setProperty("--grid-minor", `${minorPixels}px`);
        this.style.setProperty("--grid-line-width", `${lineWidth}px`);
    }

    disconnectedCallback() {
        if (this.gridResizeObserver) {
            this.gridResizeObserver.disconnect();
            this.gridResizeObserver = null;
        }
    }

    clear(manual = true) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        if (manual)
            this.invalidate(this.layer);
    }
    palettize(colors) {
        function distance(a, b) {
            let d = [
                a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]
            ];
            return Math.sqrt(
                d[0] * d[0] + d[1] * d[1] + d[2] * d[2] + d[3] * d[3]
            );
        }

        let imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (let x = 0; x < this.ctx.canvas.width; x++ ) {
            for (let y = 0; y < this.ctx.canvas.height; y++ ) {
                let color = imageData.data.slice(
                    (y * this.ctx.canvas.width + x) * 4,
                    ((y * this.ctx.canvas.width + x) * 4) + 4,
                );
                let minDistance = 9999.0;
                let minColor = [0,0,0,0];
                for (let compare of colors) {
                    if (distance(color, compare) < minDistance) {
                        minDistance = distance(color, compare);
                        minColor = compare;
                    }
                }
                imageData.data[((y * this.ctx.canvas.width + x) * 4) + 0] = minColor[0];
                imageData.data[((y * this.ctx.canvas.width + x) * 4) + 1] = minColor[1];
                imageData.data[((y * this.ctx.canvas.width + x) * 4) + 2] = minColor[2];
                imageData.data[((y * this.ctx.canvas.width + x) * 4) + 3] = minColor[3];
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
    }

    previousX = 0;
    previousY = 0;
    eventToCanvasCoords(e, x, y) {
        let {clientX, clientY} = e;
        let {top, left, width, height} = this.ctx.canvas.getBoundingClientRect();

        return {
            current: [
                ((clientX - left)/width) * this.ctx.canvas.width,
                ((clientY - top)/height) * this.ctx.canvas.height,
            ],
            previous: [
                ((this.previousX - left)/width) * this.ctx.canvas.width,
                ((this.previousY - top)/height) * this.ctx.canvas.height,
            ]
        };
    }

    start;
    handleMouseDown(e) {
        if (this.layer == -1)
            return;

        this.mouseDown = true;

        this.ctx.fillStyle = this.ctx.strokeStyle = this.color;
        if (this.color == "transparent" || this.brushStyle == BrushType.Erase)
            this.ctx.fillStyle = this.ctx.strokeStyle = "white";

        let {current} = this.eventToCanvasCoords(e);
        this.start = current;
        if (this.color == "transparent" || this.brushStyle == BrushType.Erase)
            this.ctx.globalCompositeOperation = "destination-out";

        if (e.ctrlKey || this.brushStyle == BrushType.Fill) {
            floodFill(this.ctx, Math.floor(current[0]), Math.floor(current[1]), this.color == "transparent" || this.brushStyle == BrushType.Erase);
            this.mouseDown = false;
        } else {
            let brushSize = e.pointerType == "pen" ? Math.max(e.pressure, 0.2) : this.brushSize;
            aliasedLine(this.ctx, current, current, brushSize * brushScale, this.brushStyle == BrushType.Square);
        }

        this.ctx.globalCompositeOperation = "source-over";
        this.invalidate(this.layer);
    }
    handleMouseMove(e) {
        let {current, previous} = this.eventToCanvasCoords(e);
        // Straight lines
        // if (e.shiftKey && this.mouseDown) {
        //     let u = new Vector2(
        //         Math.abs(current[0] - this.start[0]),
        //         Math.abs(current[1] - this.start[1])).normalize();
        //     let horizontal = u.x > u.y;
        //     if (horizontal) {
        //         current[1] = previous[1] = this.start[1];
        //     } else {
        //         current[0] = previous[0] = this.start[0];
        //     }
        // }
        let brushSize = e.pointerType == "pen" ? Math.max(e.pressure, 0.2) : this.brushSize;

        this.overlayCtx.clearRect(0, 0,
                                  this.overlayCtx.canvas.width, this.overlayCtx.canvas.height);
        this.overlayCtx.beginPath(); // Need to do this after clearing?
        this.overlayCtx.fillStyle = (this.color == "transparent" || this.brushStyle == BrushType.Erase) ? "rgba(0,0,0,0.5)" : this.color;
        if (this.brushStyle == BrushType.Square) {
            let radius = brushSize * brushScale;
            this.overlayCtx.fillRect(Math.floor(current[0]) - radius, Math.floor(current[1]) - radius, radius*2, radius*2);
        } else {
            aliasedCircle(this.overlayCtx, current[0], current[1], brushSize * brushScale);
        }
        this.overlayCtx.fill();
        
        if (this.mouseDown) {
            if (this.color == "transparent" || this.brushStyle == BrushType.Erase)
                this.ctx.globalCompositeOperation = "destination-out";
            aliasedLine(this.ctx, previous, current, brushSize * brushScale, this.brushStyle == BrushType.Square);
            this.ctx.globalCompositeOperation = "source-over";

            this.invalidate(this.layer);
        }

        this.previousX = e.clientX;
        this.previousY = e.clientY;

        const currentNormalized = {
            x: current[0] / this.ctx.canvas.width,
            y: current[1] / this.ctx.canvas.height,
        };

        if (currentNormalized.x >= 0 && currentNormalized.x <= 1 && currentNormalized.y >= 0 && currentNormalized.y <= 1) {
            this.dispatchEvent(new CustomEvent("clothmove", {
                detail: currentNormalized
            }));
        }
    }
    handleMouseUp(e) {
        if (this.mouseDown)
            this.layers[this.layer].push(this.ctx);
        this.mouseDown = false;
    }

    invalidate(layer) {
        this.textures[layer].image.data = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.textures[layer].needsUpdate = true;

        this.dispatchEvent(new CustomEvent("change", {
            detail: layer
        }));
    }
    async saveToLayer(layer) {
        await this.layers[layer].push(this.ctx);
    }
    async loadLayer(layer) {
        if (this.layer == layer)
            return;
        await this.saveToLayer(this.layer);

        this.layer = layer;

        await this.layers[layer].restore(this.ctx);
    }

    async serialize() {
        // Only save this layer because other layers
        //    should have been saved using loadLayer
        await this.saveToLayer(this.layer);
        return this.layers;
    }
    async deserialize(blobs) {
        for (let [i, l] of this.layers.entries()) {
            this.layer = i;
            l.clear();
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            if (blobs[i] ?? null != null) {
                let blob = blobs[i];
                let bitmap = await createImageBitmap(blob);
                this.ctx.drawImage(bitmap, 0, 0);
            }

            await l.push(this.ctx);
            this.invalidate(i);
        }
        await this.loadLayer(0); 
    }
}

customElements.define("itmas-cloth", Cloth);
