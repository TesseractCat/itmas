class Layer extends HTMLElement {
    nameElem;
    toggleButton;
    isHidden = false;

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        const wrapper = document.createElement("div");
        wrapper.id = "wrapper";
        this.wrapper = wrapper;

        this.toggleButton = document.createElement("button");
        this.toggleButton.type = "button";
        this.toggleButton.id = "toggle";
        this.toggleButton.setAttribute("aria-label", "Hide layer");

        const icon = document.createElement("img");
        icon.alt = "";
        icon.src = "icons/eye-solid-full.svg";
        this.toggleButton.append(icon);

        this.nameElem = document.createElement("span");

        wrapper.append(this.nameElem, this.toggleButton);

        const style = document.createElement("style");
        style.textContent = `
:host {
    display: block;
    width: 100%;
}

#wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 100%;
}

span {
    flex-grow: 1;
    margin-left: 15%;
}

#toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 30px;
    border: 1px solid black;
    border-radius: var(--button-roundness) 0px 0px var(--button-roundness);
    background-color: color-mix(in srgb, var(--tab-color) 50%, white 50%);
    border-right: 0px;
    padding-left: 5px;
}
#toggle:hover {
    background-color: color-mix(in srgb, var(--tab-color) 30%, white 70%);
}
#toggle:active {
    background-color: color-mix(in srgb, var(--tab-color) 70%, white 30%);
}

#toggle img {
    width: 20px;
    height: 20px;
    opacity: 0.7;
}

:host([hidden-layer="true"]) #toggle img {
    opacity: 0.25;
}
`;

        this.shadowRoot.append(style, wrapper);
    }

    connectedCallback() {
        this.nameElem.innerText = `${parseInt(this.getAttribute("layer")) + 1}`;
        this.toggleButton.addEventListener("click", (event) => {
            event.stopPropagation();
            this.setHidden(!this.isHidden);
            this.dispatchEvent(new CustomEvent("toggle", {
                detail: { hidden: this.isHidden }
            }));
        });
        this.wrapper.addEventListener("click", (event) => {
            this.dispatchEvent(new CustomEvent("enable", {}));
        });
    }

    setHidden(hidden) {
        this.isHidden = hidden;
        this.setAttribute("hidden-layer", hidden ? "true" : "false");
        this.toggleButton.setAttribute("aria-label", hidden ? "Show layer" : "Hide layer");
    }
}

customElements.define("itmas-layer", Layer);
