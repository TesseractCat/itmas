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
export function aliasedLine(ctx, p1, p2, radius, square = false) {
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
    if (!square) {
        aliasedCircle(ctx, x1, y1, radius);
        aliasedCircle(ctx, x2, y2, radius);
        ctx.fill();
    } else {
        ctx.fillRect(Math.floor(x1) - radius, Math.floor(y1) - radius, radius*2, radius*2)
        ctx.fillRect(Math.floor(x2) - radius, Math.floor(y2) - radius, radius*2, radius*2)
    }
    // ctx.drawImage(brush, x1 - radius, y1 - radius)
    // ctx.drawImage(brush, x2 - radius, y2 - radius)
}
