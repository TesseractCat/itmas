class Layer extends HTMLElement {
    nameElem;

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.nameElem = document.createElement("span");

        this.shadowRoot.append(this.nameElem);
    }

    connectedCallback() {
        this.nameElem.innerText = `[${this.getAttribute("layer")}]`;
    }
}

customElements.define("itmas-layer", Layer);
