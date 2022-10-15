import { aliasedLine } from './aliased';
import { Texture, DataTexture } from 'three';

class Cloth extends HTMLElement {
    canvas;
    ctx;

    color = "black";
    brushSize = 5;
    brushSquare = false;

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

        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = canvas.width;
        canvas.addEventListener("mousedown", (e) => this.handleMouseDown(e));
        canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
        document.addEventListener("mouseup", (e) => this.handleMouseUp(e));
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d", {willReadFrequently: true});

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

canvas {
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
`;

        this.initLayer(0);

        this.shadowRoot.append(style, canvas, title);
    }

    clear(manual = true) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (manual)
            this.invalidate(this.layer);
    }

    eventToCanvasCoords(e, x, y) {
        let {offsetX, offsetY, movementX, movementY} = e;
        let {width, height} = this.canvas.getBoundingClientRect();
        return {
            current: [
                (offsetX/width) * this.canvas.width,
                (offsetY/height) * this.canvas.height,
            ],
            previous: [
                ((offsetX - movementX)/width) * this.canvas.width,
                ((offsetY - movementY)/height) * this.canvas.height,
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
        aliasedLine(this.ctx, current, current, this.brushSize, this.brushSquare);
        this.ctx.globalCompositeOperation = "source-over";

        this.invalidate(this.layer);
    }
    handleMouseMove(e) {
        if (this.mouseDown) {
            let {current, previous} = this.eventToCanvasCoords(e);

            if (this.color == "transparent")
                this.ctx.globalCompositeOperation = "destination-out";
            aliasedLine(this.ctx, previous, current, this.brushSize, this.brushSquare);
            this.ctx.globalCompositeOperation = "source-over";

            this.invalidate(this.layer);
        }
    }
    handleMouseUp(e) {
        this.mouseDown = false;
    }

    invalidate(layer) {
        this.textures[layer].image.data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.textures[layer].needsUpdate = true;
    }
    initLayer(layer) {
        if (this.textures[layer] != null)
            this.textures[layer].dispose();

        this.textures[layer] =
            new DataTexture(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
                            this.canvas.width, this.canvas.height);
        this.textures[layer].flipY = true;
        this.textures[layer].needsUpdate = true;
    }
    async saveToLayer(layer) {
        const blob = await new Promise(resolve => this.canvas.toBlob(resolve));
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
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.initLayer(i);
                continue;
            }

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
