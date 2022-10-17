class Palette extends HTMLElement {
    divs = [];

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        const colors = [
            "transparent",
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

        let wrapper = document.createElement("div");
        wrapper.id = "wrapper";

        for (const [i, color] of colors.entries()) {
            let colorInput = document.createElement("input");
            colorInput.type = "color";
            colorInput.id = i;
            colorInput.value = color;

            let colorDiv = document.createElement("label");
            colorDiv.setAttribute("for", i);
            colorDiv.style.backgroundColor = color;
            colorDiv.classList.add("color");
            if (color == "transparent")
                colorDiv.classList.add("transparent");

            if (color == "black")
                colorDiv.classList.add("selected");

            colorDiv.addEventListener("click", (e) => {
                for (const elem of [...wrapper.getElementsByClassName("selected")])
                    elem.classList.remove("selected");
                colorDiv.classList.add("selected");

                this.dispatchEvent(new CustomEvent("change", {
                    detail: colorDiv.style.backgroundColor
                }));

                e.preventDefault();
            });

            colorInput.addEventListener("change", (e) => {
                colorDiv.style.backgroundColor = e.target.value;

                this.dispatchEvent(new CustomEvent("change", {
                    detail: e.target.value
                }));
            });
            if (color != "transparent") {
                colorDiv.addEventListener("contextmenu", (e) => {
                    colorInput.dispatchEvent(new MouseEvent("click"));
                    e.preventDefault();
                    return false;
                }, false);
            }
            
            if (color != "transparent") {
                colorDiv.append(colorInput);
                this.divs.push(colorDiv);
            }
            wrapper.append(colorDiv);
        }

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
    border-radius: var(--roundness);

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
}

customElements.define("itmas-palette", Palette);
