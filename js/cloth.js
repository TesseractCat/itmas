import { aliasedLine, aliasedCircle } from './aliased';
import { Texture, DataTexture } from 'three';

export const BrushType = {
    Circle: 'Circle',
    Square: 'Square',
    Fill: 'Fill',
};

function floodFill(ctx, x, y, color) {
    let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    // TODO: Implement
}

const brushScale = 10;

class Cloth extends HTMLElement {
    ctx;
    overlayCtx;

    size;

    color = "black";
    brushSize = 0.5;
    brushStyle = BrushType.Circle;

    textures = Array(4).fill(null).map(() => {
        let t = new DataTexture(
            new Uint8Array([0,0,0,0]), 1, 1
        );
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
        canvas.addEventListener("pointermove", (e) => this.handleMouseMove(e));
        canvas.addEventListener("pointerout",  (e) => this.handleMouseOut(e));
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

        this.initLayer(0);

        this.shadowRoot.append(style, canvas, overlayCanvas, title);
    }

    clear(manual = true) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        if (manual)
            this.invalidate(this.layer);
    }

    eventToCanvasCoords(e, x, y) {
        let {offsetX, offsetY, movementX, movementY} = e;
        let {width, height} = this.ctx.canvas.getBoundingClientRect();
        return {
            current: [
                (offsetX/width) * this.ctx.canvas.width,
                (offsetY/height) * this.ctx.canvas.height,
            ],
            previous: [
                ((offsetX - movementX)/width) * this.ctx.canvas.width,
                ((offsetY - movementY)/height) * this.ctx.canvas.height,
            ]
        };
    }
    handleMouseDown(e) {
        if (this.layer == -1)
            return;

        this.mouseDown = true;

        this.ctx.fillStyle = this.ctx.strokeStyle = this.color;
        if (this.color == "transparent")
            this.ctx.fillStyle = this.ctx.strokeStyle = "white";

        let {current} = this.eventToCanvasCoords(e);
        if (this.color == "transparent")
            this.ctx.globalCompositeOperation = "destination-out";
        let brushSize = e.pointerType == "pen" ? Math.max(e.pressure, 0.2) : this.brushSize;
        aliasedLine(this.ctx, current, current, brushSize * brushScale, this.brushStyle == BrushType.Square);
        this.ctx.globalCompositeOperation = "source-over";

        this.invalidate(this.layer);
    }
    handleMouseMove(e) {
        let {current, previous} = this.eventToCanvasCoords(e);
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
    }
    handleMouseUp(e) {
        this.mouseDown = false;
    }
    handleMouseOut(e) {
        this.overlayCtx.clearRect(0, 0,
                                  this.overlayCtx.canvas.width, this.overlayCtx.canvas.height);
        this.overlayCtx.beginPath(); // Need to do this after clearing?
    }

    invalidate(layer) {
        this.textures[layer].image.data = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.textures[layer].needsUpdate = true;
    }
    initLayer(layer) {
        if (this.textures[layer] != null)
            this.textures[layer].dispose();

        this.textures[layer] =
            new DataTexture(this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height),
                            this.ctx.canvas.width, this.ctx.canvas.height);
        this.textures[layer].flipY = true;
        this.textures[layer].needsUpdate = true;
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
        } else {
            this.initLayer(layer);
        }
    }

    async serialize() {
        await this.saveToLayer(this.layer);
        return this.layers;
    }
    async deserialize(layers) {
        this.layer = -1;
        this.layers = layers;

        for (let [i, l] of this.layers.entries()) {
            if (l == null) {
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                this.initLayer(i);
                continue;
            }

            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            let img = new Image();
            let blobUrl = URL.createObjectURL(l);
            img.setAttribute("src", blobUrl);
            await new Promise(resolve => img.addEventListener("load", resolve));
            this.ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(blobUrl);

            this.initLayer(i);
        }
        await this.loadLayer(0); 
    }
}

customElements.define("itmas-cloth", Cloth);
