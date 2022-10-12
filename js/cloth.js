// https://stackoverflow.com/questions/45749018/how-to-make-a-fast-not-anti-aliasing-html5canvas-basic-drawing-function
function aliasedCircle(ctx, xc, yc, r) { // https://stackoverflow.com/a/45745753
    let x = r, y = 0, cd = 0;
    xc = Math.floor(xc); yc = Math.floor(yc);

    // middle line
    ctx.rect(xc - x, yc, r<<1, 1);

    while (x > y) {
        cd -= (--x) - (++y);
        if (cd < 0) cd += x++;
        ctx.rect(xc - y, yc - x, y<<1, 1);    // upper 1/4
        ctx.rect(xc - x, yc - y, x<<1, 1);    // upper 2/4
        ctx.rect(xc - x, yc + y, x<<1, 1);    // lower 3/4
        ctx.rect(xc - y, yc + x, y<<1, 1);    // lower 4/4
    }
}
function fastLine(ctx, x1, y1, x2, y2) {
    var dlt, mul,
        sl = y2 - y1,
        ll = x2 - x1,
        yl = false,
        lls = ll >> 31,
        sls = sl >> 31,
        i;

    if ((sl ^ sls) - sls > (ll ^ lls) - lls) {
        sl ^= ll;
        ll ^= sl;
        sl ^= ll;
        yl = true
    }

    dlt = ll < 0 ? -1 : 1;
    mul = (ll === 0) ? sl : sl / ll;

    if (yl) {
        x1 += 0.5;
        for (i = 0; i !== ll; i += dlt)
            ctx.rect((x1 + i * mul)|0, y1 + i, 1, 1)
    }
    else {
        y1 += 0.5;
        for (i = 0; i !== ll; i += dlt)
            ctx.rect(x1 + i, (y1 + i * mul)|0, 1, 1)
    }
}
function aliasedLine(ctx, p1, p2, radius) {
    let [x1, y1] = p1;
    let [x2, y2] = p2;

    // Calculate angle
    var diffX = x2 - x1,
        diffY = y2 - y1,
        angle = Math.atan2(diffY, diffX),
        // Two edge lines offset per angle
        lx1 = x1 - radius * Math.sin(angle),
        ly1 = y1 + radius * Math.cos(angle),
        lx2 = x2 - radius * Math.sin(angle),
        ly2 = y2 + radius * Math.cos(angle),
        rx1 = x1 + radius * Math.sin(angle),
        ry1 = y1 - radius * Math.cos(angle),
        rx2 = x2 + radius * Math.sin(angle),
        ry2 = y2 - radius * Math.cos(angle);

    // Main line
    ctx.beginPath();
    // FIXME: Still causes some aliasing
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = radius<<1;
    ctx.stroke();
    
    // Aliased edges
    ctx.beginPath();
    fastLine(ctx, lx1|0, ly1|0, lx2|0, ly2|0);
    fastLine(ctx, rx1|0, ry1|0, rx2|0, ry2|0);
    ctx.fill();

    // Caps
    aliasedCircle(ctx, x1, y1, radius);
    aliasedCircle(ctx, x2, y2, radius);
    ctx.fill();
    // ctx.drawImage(brush, x1 - radius, y1 - radius)
    // ctx.drawImage(brush, x2 - radius, y2 - radius)
}

class Cloth extends HTMLElement {
    canvas;
    ctx;
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

canvas {
    width: 100%;
    height: 100%;

    image-rendering: pixelated;
    background-color: #FFF;
    border: 1px solid black;
}
#title {
    position: absolute;
    top: 10px;
    left: 10px;

    font-family: arial;
    color: rgba(0,0,0,0.5);
}
`;

        this.shadowRoot.append(style, canvas, title);
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
        console.log(this.canvas);

        this.mouseDown = true;
        this.ctx.fillStyle = this.ctx.strokeStyle = "green";

        let {current} = this.eventToCanvasCoords(e);
        aliasedLine(this.ctx, current, current, 5);
    }
    handleMouseMove(e) {
        if (this.mouseDown) {
            let {current, previous} = this.eventToCanvasCoords(e);
            aliasedLine(this.ctx, previous, current, 5);
        }
    }
    handleMouseUp(e) {
        this.mouseDown = false;
    }
}

customElements.define("itmas-cloth", Cloth);
