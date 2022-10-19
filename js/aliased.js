// https://stackoverflow.com/questions/45749018/how-to-make-a-fast-not-anti-aliasing-html5canvas-basic-drawing-export function
export function aliasedCircle(ctx, xc, yc, r) { // https://stackoverflow.com/a/45745753
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
export function fastLine(ctx, x1, y1, x2, y2) {
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

export function bresenhamLine(ctx, p1, p2, radius = 1) {
    p1 = [Math.floor(p1[0]), Math.floor(p1[1])];
    p2 = [Math.floor(p2[0]), Math.floor(p2[1])];
    let min = [Math.min(p1[0], p2[0]) - radius, Math.min(p1[1], p2[1]) - radius];
    let max = [Math.max(p1[0], p2[0]) + radius, Math.max(p1[1], p2[1]) + radius];
    let width = max[0] - min[0] + 1;
    let height = max[1] - min[1] + 1;

    if (width == 0 || height == 0)
        return;

    let imageData = ctx.getImageData(min[0], min[1], width, height);
    let color = [
        parseInt(ctx.fillStyle.substring(1,3), 16),
        parseInt(ctx.fillStyle.substring(3,5), 16),
        parseInt(ctx.fillStyle.substring(5,7), 16),
        255
    ];

    function setColor(p, c) {
        imageData.data[((p[1] * width + p[0]) * 4) + 0] = c[0];
        imageData.data[((p[1] * width + p[0]) * 4) + 1] = c[1];
        imageData.data[((p[1] * width + p[0]) * 4) + 2] = c[2];
        imageData.data[((p[1] * width + p[0]) * 4) + 3] = c[3];
    }

    // http://members.chello.at/~easyfilter/bresenham.html
    let [x0, y0] = [p1[0] - min[0], p1[1] - min[1]];
    let [x1, y1] = [p2[0] - min[0], p2[1] - min[1]];

    let dx =  Math.abs(x1-x0), sx = x0<x1 ? 1 : -1;
    let dy = -Math.abs(y1-y0), sy = y0<y1 ? 1 : -1; 
    let err = dx+dy;
    
    while (true) {
        // FIXME: Probably inefficient way to do thickness
        for (let i = -radius; i <= radius; i++) {
            setColor([x0+i,y0], color);
            setColor([x0,y0+i], color);
        }
        if (x0==x1 && y0==y1) break;
        let e2 = 2 * err;
        if (e2 >= dy) { err += dy; x0 += sx; }
        if (e2 <= dx) { err += dx; y0 += sy; }
    }

    ctx.putImageData(imageData, min[0], min[1]);
}
export function aliasedLine(ctx, p1, p2, radius, square = false) {
    bresenhamLine(ctx, p1, p2, radius);

    // Caps
    let [x1, y1] = p1;
    let [x2, y2] = p2;
    ctx.beginPath();
    if (!square) {
        aliasedCircle(ctx, x1, y1, radius);
        aliasedCircle(ctx, x2, y2, radius);
    } else {
        let rectRadius = radius;
        ctx.rect(Math.floor(x1) - rectRadius, Math.floor(y1) - rectRadius, rectRadius*2, rectRadius*2)
        ctx.rect(Math.floor(x2) - rectRadius, Math.floor(y2) - rectRadius, rectRadius*2, rectRadius*2)
    }
    ctx.fill();
}
