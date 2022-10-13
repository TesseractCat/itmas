class Palette extends HTMLElement {
    value;

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        const colors = [
            "transparent", "black", "white", "red", "orange", "yellow", "green", "blue", "indigo", "violet"
        ];

        let divs = [];

        for (const color of colors) {
            let colorDiv = document.createElement("div");
            colorDiv.style.backgroundColor = color;
            colorDiv.classList.add("color");
            colorDiv.classList.add(color);

            if (color == "black")
                colorDiv.classList.add("selected");

            colorDiv.addEventListener("click", () => {
                for (const div of divs)
                    div.classList.remove("selected");
                colorDiv.classList.add("selected");
                this.value = color;

                this.dispatchEvent(new CustomEvent("change", {
                    detail: color
                }));
            });
            
            divs.push(colorDiv);
        }

        const style = document.createElement("style");
        style.textContent = `
:host {
    display: block;
}
* {
    box-sizing: border-box;
}
.color {
    border: 3px solid black;
    border-radius: 100%;
    width: 100%;
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
        
        this.shadowRoot.append(style, ...divs);
    }
}

customElements.define("itmas-palette", Palette);
