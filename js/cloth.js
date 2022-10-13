import { aliasedLine } from './aliased';
import { CanvasTexture } from 'three';

class Cloth extends HTMLElement {
    canvas;
    ctx;
    color = "black";

    textures = [];
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
        this.ctx = canvas.getContext("2d");
        this.textures = [new CanvasTexture(canvas)];

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
    border: 1px solid black;

    background-position: -20px -20px;
    background-size: 40px 40px;
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

        this.shadowRoot.append(style, canvas, title);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
        this.mouseDown = true;
        if (this.color == "transparent") {
            this.ctx.fillStyle = this.ctx.strokeStyle = "white";
            this.ctx.globalCompositeOperation = "destination-out";
        } else {
            this.ctx.fillStyle = this.ctx.strokeStyle = this.color;
            this.ctx.globalCompositeOperation = "source-over";
        }

        let {current} = this.eventToCanvasCoords(e);
        aliasedLine(this.ctx, current, current, 5);
        this.invalidate(this.layer);
    }
    handleMouseMove(e) {
        if (this.mouseDown) {
            let {current, previous} = this.eventToCanvasCoords(e);
            aliasedLine(this.ctx, previous, current, 5);
            this.invalidate(this.layer);
        }
    }
    handleMouseUp(e) {
        this.mouseDown = false;
    }

    invalidate(layer) {
        this.textures[layer].needsUpdate = true;
    }
}

customElements.define("itmas-cloth", Cloth);
