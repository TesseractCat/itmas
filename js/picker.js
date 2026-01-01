function clamp01(value) {
    return Math.min(Math.max(value, 0), 1);
}

function hsvToRgb(h, s, v) {
    s = clamp01(s);
    v = clamp01(v);

    const c = v * s;
    const hh = ((h % 360) + 360) % 360;
    const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
    let r = 0;
    let g = 0;
    let b = 0;

    if (hh < 60) {
        r = c;
        g = x;
    } else if (hh < 120) {
        r = x;
        g = c;
    } else if (hh < 180) {
        g = c;
        b = x;
    } else if (hh < 240) {
        g = x;
        b = c;
    } else if (hh < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }

    const m = v - c;
    return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255),
    ];
}

function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let hue = 0;
    if (delta !== 0) {
        if (max === r) {
            hue = ((g - b) / delta) % 6;
        } else if (max === g) {
            hue = ((b - r) / delta) + 2;
        } else {
            hue = ((r - g) / delta) + 4;
        }
        hue *= 60;
    }

    if (hue < 0)
        hue += 360;

    const saturation = max === 0 ? 0 : delta / max;
    const value = max;

    return {
        h: hue,
        s: saturation,
        v: value,
    };
}

function rgbToHex(r, g, b) {
    const toHex = (v) => {
        let hex = v.toString(16);
        if (hex.length === 1)
            hex = "0" + hex;
        return hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(value) {
    const hexMatch = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (!hexMatch)
        return null;

    let digits = hexMatch[1];
    if (digits.length === 3)
        digits = digits.split("").map((d) => d + d).join("");

    const intVal = parseInt(digits, 16);
    return [
        (intVal >> 16) & 0xff,
        (intVal >> 8) & 0xff,
        intVal & 0xff,
    ];
}

function rgbStringToArray(value) {
    const rgbMatch = value.match(/rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
    if (!rgbMatch)
        return null;

    return [
        clamp01(parseInt(rgbMatch[1], 10) / 255) * 255,
        clamp01(parseInt(rgbMatch[2], 10) / 255) * 255,
        clamp01(parseInt(rgbMatch[3], 10) / 255) * 255,
    ].map((v) => Math.round(v));
}

function normalizeHexText(value) {
    if (!value)
        return null;

    let text = value.trim();
    if (text === "")
        return null;

    if (!text.startsWith("#"))
        text = `#${text}`;

    if (/^#[0-9a-f]{3}$/i.test(text))
        return text;
    if (/^#[0-9a-f]{6}$/i.test(text))
        return text;

    return null;
}

function parseColor(value) {
    if (!value)
        return null;

    const hexText = normalizeHexText(value);
    if (hexText) {
        return hexToRgb(hexText);
    }

    const rgbCandidate = rgbStringToArray(value);
    if (rgbCandidate)
        return rgbCandidate;

    return null;
}

class ColorPicker extends HTMLElement {
    _hue = 0;
    _saturation = 1;
    _brightness = 1;
    _color = "rgb(255, 0, 0)";
    _rgb = [255, 0, 0];
    _pointerActive = false;

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        const wrapper = document.createElement("div");
        wrapper.id = "wrapper";

        const canvasWrapper = document.createElement("div");
        canvasWrapper.id = "canvas-wrapper";

        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 200;
        canvas.id = "saturation-value";
        canvasWrapper.append(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.indicator = document.createElement("div");
        this.indicator.id = "indicator";
        canvasWrapper.append(this.indicator);

        const controls = document.createElement("div");
        controls.id = "controls";

        // const hueLabel = document.createElement("label");
        // hueLabel.htmlFor = "hue-slider";
        // hueLabel.textContent = "Hue";

        this.hueSlider = document.createElement("input");
        this.hueSlider.id = "hue-slider";
        this.hueSlider.type = "range";
        this.hueSlider.min = "0";
        this.hueSlider.max = "360";
        this.hueSlider.value = String(this._hue);

        const previewRow = document.createElement("div");
        previewRow.id = "preview-row";

        this.preview = document.createElement("div");
        this.preview.id = "preview";

        this.hexInput = document.createElement("input");
        this.hexInput.id = "hex";
        this.hexInput.type = "text";
        this.hexInput.value = "#ff0000";

        previewRow.append(this.preview, this.hexInput);
        controls.append(this.hueSlider, previewRow);

        const style = document.createElement("style");
        style.textContent = `
:host {
    display: block;
    width: 100%;
    max-width: 260px;
}

#wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#canvas-wrapper {
    position: relative;
    width: 100%;
}

#saturation-value {
    width: 100%;
    display: block;
    border-radius: var(--roundness, 6px);
    cursor: crosshair;
    touch-action: none;
    border: 1px solid black;
}

#indicator {
    position: absolute;
    width: 14px;
    height: 14px;
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.35);
    pointer-events: none;
    transform: translate(-50%, -50%);
}

#controls {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

#controls label {
    font-size: 0.85rem;
    color: rgba(0,0,0,0.7);
}

#hue-slider {
    width: 100%;
    -webkit-appearance: none;
    height: 10px;
    border-radius: var(--roundness);
    background: linear-gradient(90deg, red, yellow, lime, aqua, blue, magenta, red);
    outline: none;
}

#hue-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #fff;
    background: #000;
    cursor: pointer;
}

#preview-row {
    display: flex;
    gap: 10px;
    align-items: center;
}

#preview {
    width: 40px;
    height: 40px;
    border-radius: var(--button-roundness, 4px);
    border: 1px solid #333;
}

#hex {
    flex: 1;
    border-radius: var(--button-roundness, 4px);
    border: 1px solid #555;
    padding: 6px 8px;
    font-family: "SFMono-Regular", "Consolas", monospace;
    font-size: 0.95rem;
    text-transform: uppercase;
    text-align: center;
}
`;

        this.shadowRoot.append(style, wrapper);
        wrapper.append(canvasWrapper, controls);

        this.hueSlider.addEventListener("input", () => {
            this._hue = parseFloat(this.hueSlider.value);
            this.redraw();
            this.updateColorFromHsv(true);
        });

        const onHexChange = () => {
            const candidate = this.hexInput.value;
            if (!candidate)
                return;
            if (this.setColor(candidate))
                return;
        };

        this.hexInput.addEventListener("change", onHexChange);
        this.hexInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                onHexChange();
            }
        });

        canvas.addEventListener("pointerdown", (e) => {
            this._pointerActive = true;
            canvas.setPointerCapture(e.pointerId);
            this.handleCanvasEvent(e);
        });
        canvas.addEventListener("pointermove", (e) => {
            if (!this._pointerActive)
                return;
            this.handleCanvasEvent(e);
        });
        canvas.addEventListener("pointerup", (e) => {
            this._pointerActive = false;
            canvas.releasePointerCapture(e.pointerId);
        });
        canvas.addEventListener("pointerleave", () => {
            this._pointerActive = false;
        });
        canvas.addEventListener("pointercancel", () => {
            this._pointerActive = false;
        });

        this.redraw();
        this.updateIndicator();
        this.updateColorFromHsv(false);
    }

    handleCanvasEvent(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = clamp01((e.clientX - rect.left) / rect.width);
        const y = clamp01((e.clientY - rect.top) / rect.height);

        this._saturation = x;
        this._brightness = 1 - y;
        this.updateIndicator();
        this.updateColorFromHsv(true);
    }

    redraw() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;

        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = `hsl(${this._hue}, 100%, 50%)`;
        ctx.fillRect(0, 0, width, height);

        const satGradient = ctx.createLinearGradient(0, 0, width, 0);
        satGradient.addColorStop(0, "rgba(255,255,255,1)");
        satGradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = satGradient;
        ctx.fillRect(0, 0, width, height);

        const valGradient = ctx.createLinearGradient(0, 0, 0, height);
        valGradient.addColorStop(0, "rgba(0,0,0,0)");
        valGradient.addColorStop(1, "rgba(0,0,0,1)");
        ctx.fillStyle = valGradient;
        ctx.fillRect(0, 0, width, height);
    }

    updateIndicator() {
        const left = this._saturation * 100;
        const top = (1 - this._brightness) * 100;
        this.indicator.style.left = `${left}%`;
        this.indicator.style.top = `${top}%`;
    }

    updateColorFromHsv(dispatch = true) {
        const [r, g, b] = hsvToRgb(this._hue, this._saturation, this._brightness);
        this._rgb = [r, g, b];
        this._color = `rgb(${r}, ${g}, ${b})`;
        this.preview.style.backgroundColor = this._color;
        this.hexInput.value = rgbToHex(r, g, b).toUpperCase();
        if (dispatch)
            this.dispatchEvent(new CustomEvent("change", { detail: this._color }));
    }

    setColor(value) {
        const rgb = parseColor(value);
        if (!rgb)
            return false;

        const { h, s, v } = rgbToHsv(...rgb);
        this._hue = h;
        this._saturation = s;
        this._brightness = v;
        this.hueSlider.value = String(Math.round(this._hue));
        this.redraw();
        this.updateIndicator();
        this.updateColorFromHsv(true);
        return true;
    }

    getColor() {
        return this._color;
    }
}

customElements.define("itmas-picker", ColorPicker);
