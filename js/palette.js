class Palette extends HTMLElement {
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

            colorDiv.addEventListener("click", () => {
                for (const e of [...wrapper.getElementsByClassName("selected")])
                    e.classList.remove("selected");
                colorDiv.classList.add("selected");

                this.dispatchEvent(new CustomEvent("change", {
                    detail: colorDiv.style.backgroundColor
                }));
            });

            colorInput.addEventListener("change", (e) => {
                colorDiv.style.backgroundColor = e.target.value;

                this.dispatchEvent(new CustomEvent("change", {
                    detail: e.target.value
                }));
            });
            colorInput.addEventListener("click", (e) => {
                if (e.button == 0)
                    e.preventDefault();
            });
            if (color != "transparent") {
                colorDiv.addEventListener("contextmenu", (e) => {
                    colorInput.dispatchEvent(new MouseEvent("click", {
                        button: 2
                    }));
                    e.preventDefault();
                    return false;
                }, false);
            }
            
            wrapper.append(colorDiv);
            if (color != "transparent")
                wrapper.append(colorInput);
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
}

.color {
    display: block;
    border: 3px solid black;
    border-radius: 100%;

    width: auto;
    flex-grow: 1;
    aspect-ratio: 1/1;

    margin-bottom: 10px;
    cursor: pointer;

    transition: border 0.2s;
}
.black {
    border: 3px solid white;
    outline: 1px solid black;
}
.color:hover, .selected {
    border-width: 6px;
}
.transparent {
    background-color: #FFF !important;
    background-size: 5px 5px;
    background-image: linear-gradient(to right, #d7d7d7 1px, transparent 1px), linear-gradient(to bottom, #d7d7d7d7 1px, transparent 1px);
}
`;
        
        this.shadowRoot.append(style, wrapper);
    }
}

customElements.define("itmas-palette", Palette);
