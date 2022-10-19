import { aliasedLine, aliasedCircle } from './aliased';
import { Texture, DataTexture, Vector2 } from 'three';

export const BrushType = {
    Circle: 'Circle',
    Square: 'Square',
    Fill: 'Fill',
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
    layers = Array(4).fill(null);
    layer = 0;

    mouseDown = false;

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

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

        const style = document.createElement("style");
        style.textContent = `
:host {
    transform: scale(1);
    display: block;
    width: 500px;
    height: 500px;

    user-select: none;
}

* {
    box-sizing: border-box;
}

#canvas {
    width: 100%;
    height: 100%;

    image-rendering: pixelated;
    background-color: #FFF;
    border: none;
    border-radius: inherit;

    background-size: 10% 10%;
    background-image: linear-gradient(to right, #d7d7d7 1px, transparent 1px), linear-gradient(to bottom, #d7d7d7d7 1px, transparent 1px);
}
#title {
    position: absolute;
    top: 10px;
    left: 10px;

    font-family: arial;
    color: rgba(0,0,0,0.5);

    pointer-events: none;
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

        this.shadowRoot.append(style, canvas, overlayCanvas, title);
    }

    clear(manual = true) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        if (manual)
            this.invalidate(this.layer);
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
        if (this.color == "transparent")
            this.ctx.fillStyle = this.ctx.strokeStyle = "white";

        let {current} = this.eventToCanvasCoords(e);
        this.start = current;
        if (this.color == "transparent")
            this.ctx.globalCompositeOperation = "destination-out";

        if (e.ctrlKey) {
            floodFill(this.ctx, Math.floor(current[0]), Math.floor(current[1]), this.color == "transparent");
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
        this.overlayCtx.fillStyle = this.color == "transparent" ? "rgba(0,0,0,0.5)" : this.color;
        if (this.brushStyle == BrushType.Square) {
            let radius = brushSize * brushScale;
            this.overlayCtx.fillRect(Math.floor(current[0]) - radius, Math.floor(current[1]) - radius, radius*2, radius*2);
        } else {
            aliasedCircle(this.overlayCtx, current[0], current[1], brushSize * brushScale);
        }
        this.overlayCtx.fill();
        
        if (this.mouseDown) {
            if (this.color == "transparent")
                this.ctx.globalCompositeOperation = "destination-out";
            aliasedLine(this.ctx, previous, current, brushSize * brushScale, this.brushStyle == BrushType.Square);
            this.ctx.globalCompositeOperation = "source-over";

            this.invalidate(this.layer);
        }

        this.previousX = e.clientX;
        this.previousY = e.clientY;
    }
    handleMouseUp(e) {
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
        const blob = await new Promise(resolve => this.ctx.canvas.toBlob(resolve));
        this.layers[layer] = blob;
    }
    async loadLayer(layer) {
        if (this.layer == layer)
            return;
        await this.saveToLayer(this.layer);
        this.clear(false);

        this.layer = layer;

        if (this.layers[this.layer] != null) {
            let img = new Image();
            let blobUrl = URL.createObjectURL(this.layers[this.layer]);
            img.setAttribute("src", blobUrl);
            await new Promise(resolve => img.addEventListener("load", resolve));

            this.ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(blobUrl);
        }
    }

    async serialize() {
        // Only save this layer because other layers
        //    should have been saved using loadLayer
        await this.saveToLayer(this.layer);
        return this.layers;
    }
    async deserialize(layers) {
        console.assert(layers.length == 4);
        this.layer = -1;
        this.layers = layers;

        for (let [i, l] of this.layers.entries()) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            if (l != null) {
                let img = new Image();
                let blobUrl = URL.createObjectURL(l);
                img.setAttribute("src", blobUrl);
                await new Promise(resolve => img.addEventListener("load", resolve));
                this.ctx.drawImage(img, 0, 0);
                URL.revokeObjectURL(blobUrl);
            }

            this.invalidate(i);
        }
        await this.loadLayer(0); 
    }
}

customElements.define("itmas-cloth", Cloth);
