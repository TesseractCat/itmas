class Palette extends HTMLElement {
    divs = [];
    selectedPaletteIndex = -1;
    selectedColorDiv = null;
    wrapper;

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

const colors = [
            "#dde4e8",
            "#ffc97a",
            "#8dc196",
            "#5a6e93",
            "#301c44",
            "#ce2f7f",
            "#ef8a6e",
            "#514cad",
            "#877aff",
        ];

        const wrapper = document.createElement("div");
        wrapper.id = "wrapper";
        this.wrapper = wrapper;

        colors.forEach((color, i) => {
            const colorInput = document.createElement("input");
            colorInput.type = "color";
            const inputId = `palette-color-${i}`;
            colorInput.id = inputId;
            colorInput.value = color;

            const colorDiv = document.createElement("label");
            colorDiv.setAttribute("for", inputId);
            colorDiv.style.backgroundColor = color;
            colorDiv.classList.add("color");

            const paletteIndex = this.divs.length;

            colorDiv.addEventListener("click", (e) => {
                this.setSelection(colorDiv, paletteIndex);
                e.preventDefault();
            });

            colorDiv.append(colorInput);
            this.divs.push(colorDiv);

            colorInput.addEventListener("change", (e) => {
                colorDiv.style.backgroundColor = e.target.value;
                this.setSelection(colorDiv, paletteIndex);
            });

            colorDiv.addEventListener("contextmenu", (e) => {
                this.setSelection(colorDiv, paletteIndex);
                colorInput.dispatchEvent(new MouseEvent("click"));
                e.preventDefault();
                return false;
            }, false);

            wrapper.append(colorDiv);
        });


        const style = document.createElement("style");
        style.textContent = `
:host {
    display: block;
}
* {
    box-sizing: border-box;
}
input {
    display: block;
    opacity: 0;
    width: 0;
    height: 0;
    padding: 0;
    border: none;
    background: none;
}

#wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: content;
    height: 100%;
    gap: 15px;
}

.color {
    display: block;
    outline: 3px solid black;
    border-radius: var(--button-roundness);

    width: 100%;
    flex-grow: 1;

    cursor: pointer;

    transition: outline 0.2s;
}
.color:hover, .selected {
    outline-width: 6px;
}
.transparent {
    background-color: #FFF !important;
    background-size: 5px 5px;
    background-image: linear-gradient(to right, #d7d7d7 1px, transparent 1px), linear-gradient(to bottom, #d7d7d7d7 1px, transparent 1px);
}
`;

        this.shadowRoot.append(style, wrapper);

        if (this.divs.length > 0) {
            this.setSelection(this.divs[0], 0, false);
        }
    }

    setSelection(colorDiv, paletteIndex, dispatch = true) {
        if (!colorDiv)
            return;
        for (const elem of [...this.wrapper.getElementsByClassName("selected")])
            elem.classList.remove("selected");
        colorDiv.classList.add("selected");
        this.selectedColorDiv = colorDiv;
        this.selectedPaletteIndex = paletteIndex;
        if (dispatch) {
            this.dispatchEvent(new CustomEvent("change", {
                detail: colorDiv.style.backgroundColor
            }));
        }
    }

    updateSelectedColor(color, { dispatch = true } = {}) {
        if (this.selectedPaletteIndex < 0)
            return false;
        const colorDiv = this.divs[this.selectedPaletteIndex];
        if (!colorDiv)
            return false;
        colorDiv.style.backgroundColor = color;
        const colorInput = colorDiv.querySelector("input");
        if (colorInput)
            colorInput.value = color;
        this.selectedColorDiv = colorDiv;
        if (dispatch) {
            this.dispatchEvent(new CustomEvent("change", {
                detail: color
            }));
        }
        return true;
    }

    emitSelectedColor() {
        if (this.selectedColorDiv) {
            this.dispatchEvent(new CustomEvent("change", {
                detail: this.selectedColorDiv.style.backgroundColor
            }));
        }
    }

    setColors(colors) { // Colors is ["rgb(x,y,z)", ...]
        function rgbToHex(rgb) {
            return "#" + rgb.split("(")[1].split(")")[0].split(",").map(x => parseInt(x).toString(16).padStart(2, "0")).join("");
        }
        for (let [i, color] of colors.entries()) {
            if (i >= this.divs.length)
                return;

            this.divs[i].style.backgroundColor = color;
            this.divs[i].firstElementChild.value = rgbToHex(color);
        }
    }
    getColors() {
        return this.divs.map(d => d.style.backgroundColor);
    }

    getSelectedColor() {
        return this.selectedColorDiv?.style?.backgroundColor ?? null;
    }
}

customElements.define("itmas-palette", Palette);
