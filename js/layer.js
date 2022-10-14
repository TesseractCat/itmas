class Layer extends HTMLElement {
    nameElem;

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.nameElem = document.createElement("span");

        this.shadowRoot.append(this.nameElem);
    }

    connectedCallback() {
        this.nameElem.innerText = `${parseInt(this.getAttribute("layer")) + 1}`;
    }
}

customElements.define("itmas-layer", Layer);
