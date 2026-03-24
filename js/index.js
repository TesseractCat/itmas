import { BrushType } from './cloth';
import './palette';
import './layer';
import './picker';

import { Scene, PerspectiveCamera, OrthographicCamera, WebGLRenderer,
         Mesh, BoxGeometry, MeshBasicMaterial,
         CanvasTexture, 
         CylinderGeometry,
         LineDashedMaterial,
         Line,
         BufferGeometry,
         Vector3,
         Euler} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js';

import { VolumeMaterial, sampleVolumeSnippet, LAYER_COUNT } from './volume';
import { jumpFlood } from './jumpflood';
import JSZip from 'jszip';
import Dexie from 'dexie';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';

import ExportVoxWorker from './exportVox.worker.js';
import ExportMCWorker from './exportMC.worker.js';


// TODO:
//  - Favicon/meta tags
// more layers?, tablet?
// steam page
//  - Jump Flood/SDF:
//      - Shading/normals
//  - Canvas:
//      - Light preview of CSG on cloth
//      - Straight line tool
//  - Layers:
//      - Move in space

function saveAs(blob, name) {
    const blobUrl = URL.createObjectURL(blob);

    let link = document.createElement("a");
    link.href = blobUrl;
    link.download = name;
    link.rel = "noopener";
    setTimeout(() => { URL.revokeObjectURL(blobUrl); }, 4E4);
    setTimeout(() => { link.dispatchEvent(new MouseEvent("click")); }, 0);
}

window.onbeforeunload = function () { return true; }
window.addEventListener('load', () => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1.0, 0.1, 1000);
    const canvas = document.getElementById("three-canvas");
    let {width, height} = canvas.getBoundingClientRect();
    // TODO: On resize, resize
    canvas.width = 512;
    canvas.height = 512;

    const renderer = new WebGLRenderer({canvas: canvas, powerPreference: "high-performance"});
    renderer.setClearColor(0xffffff);

    // FIXME: Inconsistent ordering!
    const cloths = [
        document.getElementById("top-view"),
        document.getElementById("front-view"),
        document.getElementById("side-view"),
    ];
    const views = cloths.map(x => x.textures);
    let activeCloth = null;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 0.4;
    controls.maxDistance = 3;
    controls.enableDamping = true;

    camera.position.z = 2;
    camera.position.y = 1;
    camera.position.x = 1;
    controls.update();

    // Create bounding box
    const dashedMaterial = new LineMaterial({
        color: "#aaa",
        transparent: true,
        opacity: 0.1,
        linewidth: 0.01,
    });
    const points = [
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,
        0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5,
        0.5, -0.5, 0.5,
        0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        -0.5, -0.5, -0.5,
    ];
    const boundingGeometry = new LineSegmentsGeometry();
    boundingGeometry.setPositions(points);
    const boundingBox = new LineSegments2( boundingGeometry, dashedMaterial );
    scene.add(boundingBox);

    function render() {
        requestAnimationFrame(render);
        
        controls.update();
        // let startTime = performance.now()
        renderer.render(scene, camera);
        // console.log(performance.now() - startTime);
    }
    render();

    // Create layer tabs
    const layersContainer = document.getElementById("layers");
    const layersHeader = layersContainer?.querySelector("header");

    const fragment = document.createDocumentFragment();
    for (let layer = LAYER_COUNT - 1; layer >= 0; layer--) {
        const tab = document.createElement("itmas-layer");
        tab.setAttribute("layer", layer.toString());
        if (layer === 0)
            tab.classList.add("selected");
        fragment.appendChild(tab);
    }
    layersContainer?.appendChild(fragment);

    // Wire up color palette and picker
    const paletteElem = document.getElementById("palette");
    const pickerElem = document.getElementById("picker");
    paletteElem.addEventListener("change", (e) => {
        pickerElem.setColor(e.detail);
        for (let cloth of cloths)
            cloth.color = e.detail;
    });
    pickerElem.addEventListener("change", (e) => {
        const color = e.detail;
        for (let cloth of cloths)
            cloth.color = color;
        paletteElem.updateSelectedColor(color, { dispatch: false });
    });
    paletteElem.emitSelectedColor();
    const defaultPalette = [...paletteElem.getColors()];

    document.getElementById("brush").addEventListener("change", (e) => {
        for (let cloth of cloths)
            cloth.brushSize = parseInt(e.target.value)/parseInt(e.target.getAttribute("max"));
    });
    [...document.querySelectorAll("#tool-row button[data-tool]")].forEach((button) => {
        button.addEventListener("click", (e) => {
            document.querySelector("#tool-row button.selected")?.classList.remove("selected");
            button.classList.add("selected");
            const tool = button.getAttribute("data-tool");
            for (let cloth of cloths) {
                cloth.brushStyle = tool;
            }
        });
    });

    document.getElementById("clear").addEventListener("click", () => {
        if (confirm("Are you sure you want to clear this layer?")) {
            for (let cloth of cloths)
                cloth.clear();
        }
    });

    async function handleNewModel() {
        if (!confirmDiscardIfDirty())
            return;
        for (let cloth of cloths) {
            cloth.clear(false);
        }
        await Promise.all(cloths.map((cloth) => cloth.deserialize([null, null, null, null])));
        paletteElem.setColors(defaultPalette);
        paletteElem.emitSelectedColor();
        document.querySelector("itmas-layer.selected")?.classList.remove("selected");
        document.querySelector("itmas-layer[layer='0']")?.classList.add("selected");
        setCurrentFileName(null);
        setHasUnsavedChanges(false);
    }

    document.getElementById("new").addEventListener("click", handleNewModel);

    cloths.forEach((cloth) => {
        cloth.addEventListener("change", () => {
            setHasUnsavedChanges(true);
        });
        cloth.addEventListener("pickcolor", (event) => {
            const color = event.detail;
            if (color) {
                pickerElem.setColor(color);
                for (let cloth of cloths)
                    cloth.color = color;
                paletteElem.updateSelectedColor(color, { dispatch: false });
            }
        });
        cloth.addEventListener("pointerover", () => {
            activeCloth = cloth;
        });
        cloth.addEventListener("pointerout", (event) => {
            if (!event.relatedTarget || !cloth.contains(event.relatedTarget))
                activeCloth = null;
        });
    });
    document.getElementById("expand").addEventListener("click", () => {
        for (let cloth of cloths)
            cloth.style.display = cloth.style.display == "none" ? "block" : "none";
        let grid = document.getElementById("grid");
        grid.style.display = grid.style.display == "block" ? "grid" : "block";
    });
    document.getElementById("bounding-box").addEventListener("click", () => {
        boundingBox.visible = !boundingBox.visible;
    });
    
    const exampleModels = [
        { id: "truck", label: "Truck" },
        { id: "witch", label: "Witch" },
        { id: "skeleton", label: "Skeleton" },
        { id: "cat", label: "Cat" },
        { id: "frog", label: "Frog" },
        { id: "burger", label: "Burger" },
        { id: "icecream", label: "Ice Cream" },
        { id: "sedan", label: "Sedan" }
    ];
    const savedModelsDb = new Dexie("itmas");
    savedModelsDb.version(1).stores({
        savedModels: "name, updatedAtEpoch"
    });
    const savedModelsTable = savedModelsDb.table("savedModels");
    let savedModelThumbnailUrls = [];
    const exampleZipCache = new Map();
    const exampleThumbnailCache = new Map();
    const emptyThumbnail = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    let pendingSaveData = null;
    let hasUnsavedChanges = false;
    let currentFileName = null;
    const fileNameContainer = document.querySelector("#file-name");
    const fileNameLabel = document.querySelector("#file-name p");
    const fileNameInput = document.querySelector("#file-name input");

    function normalizeModelName(name) {
        const trimmed = (name ?? "").trim();
        return trimmed || "Untitled";
    }

    function updateFileNameDisplay() {
        const displayName = normalizeModelName(currentFileName);
        const outputName = hasUnsavedChanges ? `${displayName}*` : displayName;
        fileNameLabel.textContent = outputName;
        fileNameInput.value = displayName;
    }

    function setHasUnsavedChanges(value) {
        hasUnsavedChanges = value;
        updateFileNameDisplay();
    }

    function setCurrentFileName(name) {
        const trimmed = (name ?? "").trim();
        currentFileName = trimmed ? trimmed : null;
        updateFileNameDisplay();
    }

    updateFileNameDisplay();

    async function confirmOverwriteIfExists(name) {
        const normalizedName = normalizeModelName(name);
        if (currentFileName && normalizeModelName(currentFileName) === normalizedName)
            return true;
        try {
            const existing = await savedModelsTable.get(normalizedName);
            if (!existing)
                return true;
        } catch (error) {
            console.warn("Unable to check existing models", error);
            return true;
        }
        return confirm(`"${normalizedName}" already exists. Overwrite it?`);
    }

    function blobToDataUrl(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(blob);
        });
    }

    async function getExampleZip(modelId) {
        if (exampleZipCache.has(modelId))
            return exampleZipCache.get(modelId);
        const file = await (await fetch(`./models/${modelId}.zip`)).blob();
        exampleZipCache.set(modelId, file);
        return file;
    }

    async function getExampleThumbnail(modelId) {
        if (exampleThumbnailCache.has(modelId))
            return exampleThumbnailCache.get(modelId);
        try {
            const zipBlob = await getExampleZip(modelId);
            let zip = new JSZip();
            await zip.loadAsync(zipBlob);
            const thumbnailFile = zip.file("thumbnail.png");
            if (!thumbnailFile)
                return emptyThumbnail;
            const thumbBlob = await thumbnailFile.async("blob");
            const thumbnailUrl = await blobToDataUrl(thumbBlob);
            exampleThumbnailCache.set(modelId, thumbnailUrl);
            return thumbnailUrl;
        } catch (error) {
            console.warn("Unable to load example thumbnail", error);
            return emptyThumbnail;
        }
    }

    async function getSavedModels() {
        try {
            return await savedModelsTable.orderBy("updatedAtEpoch").reverse().limit(24).toArray();
        } catch (error) {
            console.warn("Unable to read saved models", error);
            return [];
        }
    }

    async function pruneSavedModels() {
        const models = await savedModelsTable.orderBy("updatedAtEpoch").reverse().toArray();
        const toRemove = models.slice(24);
        await Promise.all(toRemove.map((model) => savedModelsTable.delete(model.name)));
    }

    async function saveModelToLibrary(model) {
        await savedModelsTable.put(model);
        await pruneSavedModels();
    }

    function clearSavedModelThumbnails() {
        savedModelThumbnailUrls.forEach((url) => URL.revokeObjectURL(url));
        savedModelThumbnailUrls = [];
    }

    async function commitSave({ name, blob, previewBlob }) {
        const normalizedName = name.trim() || "Untitled";
        const filename = `${normalizedName.replace(/\s+/g, "-").toLowerCase()}.csz`;
        const updatedAtEpoch = Date.now();
        const updatedAt = new Date(updatedAtEpoch).toLocaleString();
        await saveModelToLibrary({
            name: normalizedName,
            filename,
            updatedAt,
            updatedAtEpoch,
            thumbnailBlob: previewBlob ?? null,
            dataBlob: blob
        });
        await renderSavedModels();
        setHasUnsavedChanges(false);
    }

    function createCard({ title, subtitle, thumbnail, onClick, actions = [] }) {
        const card = document.createElement("div");
        card.className = "file-grid-card";
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", title);
        card.tabIndex = 0;

        const img = document.createElement("img");
        img.alt = title;
        img.src = thumbnail || emptyThumbnail;
        card.appendChild(img);

        const label = document.createElement("h1");
        label.textContent = title;
        card.appendChild(label);

        if (subtitle) {
            const sub = document.createElement("h2");
            sub.textContent = subtitle;
            card.appendChild(sub);
        }

        if (actions.length) {
            const actionsWrap = document.createElement("div");
            actionsWrap.style.display = "flex";
            actionsWrap.style.gap = "6px";
            actionsWrap.style.flexWrap = "wrap";
            actionsWrap.style.justifyContent = "center";
            actions.forEach((action) => {
                actionsWrap.appendChild(action);
            });
            card.appendChild(actionsWrap);
        }

        if (onClick) {
            card.addEventListener("click", onClick);
            card.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onClick();
                }
            });
        }

        return card;
    }

    async function loadZip(file) {
        let zip = new JSZip();
        await zip.loadAsync(file);

        for (const cloth of cloths)
            cloth.disableCanvas();

        for (const cloth of cloths) {
            let layers = Array(LAYER_COUNT).fill(null);

            for (let [name, image] of Object.entries(zip.files)) {
                let match = name.match(new RegExp(`${cloth.id}/layer-(\\d+).png`));
                if (match != null) {
                    layers[parseInt(match[1])] = await image.async("blob");
                    // FIXME: Is this necessary?
                    layers[parseInt(match[1])] =
                        layers[parseInt(match[1])].slice(0, layers[parseInt(match[1])].size, "image/png");
                }
            }

            await cloth.deserialize(layers);
        }

        for (const cloth of cloths)
            cloth.enableCanvas();

        let metadataFile = zip.file("metadata.json");
        if (metadataFile != null) {
            let metadata = JSON.parse(await metadataFile.async("string"));

            if ("palette" in metadata) {
                paletteElem.setColors(metadata["palette"]);
                paletteElem.emitSelectedColor();
            }
        }

        document.querySelector("itmas-layer.selected")?.classList.remove("selected");
        document.querySelector("itmas-layer[layer='0']")?.classList.add("selected");
        setHasUnsavedChanges(false);
    }

    async function loadZipAndCloseDialog(file, filename = null) {
        await loadZip(file);
        if (filename)
            setCurrentFileName(filename);
        else
            setCurrentFileName(null);
        openDialog.close();
    }

    function confirmDiscardIfDirty() {
        if (!hasUnsavedChanges)
            return true;
        return confirm("You have unsaved changes. Continue and lose them?");
    }

    function renderExamples() {
        examplesGrid.innerHTML = "";
        exampleModels.forEach((model) => {
            const card = createCard({
                title: model.label,
                thumbnail: emptyThumbnail,
                onClick: async () => {
                    if (!confirmDiscardIfDirty())
                        return;
                    const file = await getExampleZip(model.id);
                    await loadZipAndCloseDialog(file, model.label);
                }
            });
            examplesGrid.appendChild(card);

            getExampleThumbnail(model.id).then((thumbnailUrl) => {
                const img = card.querySelector("img");
                if (img)
                    img.src = thumbnailUrl;
            });
        });
    }

    async function renderSavedModels() {
        savedGrid.innerHTML = "";
        clearSavedModelThumbnails();
        const models = await getSavedModels();
        savedEmpty.style.display = models.length ? "none" : "block";

        models.forEach((model) => {
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.textContent = "Remove";
            deleteButton.addEventListener("click", async (event) => {
                event.stopPropagation();
                const confirmed = confirm(`Remove "${model.name}" from saved models?`);
                if (!confirmed)
                    return;
                await savedModelsTable.delete(model.name);
                await renderSavedModels();
            });

            const exportButton = document.createElement("button");
            exportButton.type = "button";
            exportButton.textContent = "Download";
            exportButton.addEventListener("click", (event) => {
                event.stopPropagation();
                const blob = model.dataBlob;
                if (!blob)
                    return;
                saveAs(blob, model.filename ?? "model.csz");
            });

            const thumbnailUrl = model.thumbnailBlob ? URL.createObjectURL(model.thumbnailBlob) : emptyThumbnail;
            if (model.thumbnailBlob)
                savedModelThumbnailUrls.push(thumbnailUrl);

            const card = createCard({
                title: model.name,
                subtitle: model.updatedAt,
                thumbnail: thumbnailUrl,
                onClick: async () => {
                    if (!confirmDiscardIfDirty())
                        return;
                    const blob = model.dataBlob;
                    if (!blob)
                        return;
                    await loadZipAndCloseDialog(blob, model.name);
                },
                actions: [exportButton, deleteButton]
            });
            savedGrid.appendChild(card);
        });
    }

    const openDialog = document.getElementById("open-dialog");
    const openDialogButton = document.getElementById("open-dialog-button");
    const examplesGrid = document.getElementById("examples-grid");
    const savedGrid = document.getElementById("saved-grid");
    const savedEmpty = document.getElementById("saved-empty");
    const loadInput = document.getElementById("load");
    const loadFileButton = document.getElementById("load-file-button");
    const loadFileName = document.getElementById("load-file-name");
    const saveDialog = document.getElementById("save-dialog");
    const saveDialogName = document.getElementById("save-name");
    const saveDialogThumbnail = document.getElementById("save-thumbnail");
    const exportDialog = document.getElementById("export-dialog");
    const exportFormatInputs = [...document.querySelectorAll("input[name='export-format']")];
    const exportParamsPanels = [...document.querySelectorAll(".export-params")];
    const exportBlurRadiusInput = document.getElementById("export-blur-radius");
    const exportBlurIterationsInput = document.getElementById("export-blur-iterations");
    const exportVertexColorsInput = document.getElementById("export-vertex-colors");

    openDialogButton.addEventListener("click", async () => {
        renderExamples();
        await renderSavedModels();
        openDialog.showModal();
    });

    openDialog.addEventListener("close", () => {
        loadInput.value = "";
        loadFileName.textContent = "No file selected";
    });

    async function handleOpenDialog() {
        renderExamples();
        await renderSavedModels();
        openDialog.showModal();
    }

    document.addEventListener("keydown", (event) => {
        const target = event.target;
        if (target instanceof HTMLElement) {
            const tagName = target.tagName;
            if (tagName === "INPUT" || tagName === "TEXTAREA" || target.isContentEditable)
                return;
        }
        const key = event.key.toLowerCase();
        if (!event.ctrlKey && !event.shiftKey) {
            if (key == "e") {
                for (let cloth of cloths) {
                    cloth.brushStyle = BrushType.Erase;
                }
                document.querySelector("#tool-row button.selected")?.classList.remove("selected");
                document.querySelector(`#tool-row button[data-tool="${cloths[0].brushStyle}"]`)?.classList.add("selected");
            } else if (key == "f") {
                for (let cloth of cloths) {
                    cloth.brushStyle = BrushType.Fill;
                }
                document.querySelector("#tool-row button.selected")?.classList.remove("selected");
                document.querySelector(`#tool-row button[data-tool="${cloths[0].brushStyle}"]`)?.classList.add("selected");
            } else if (key == "c") {
                for (let cloth of cloths) {
                    cloth.brushStyle = BrushType.Circle;
                }
                document.querySelector("#tool-row button.selected")?.classList.remove("selected");
                document.querySelector(`#tool-row button[data-tool="${cloths[0].brushStyle}"]`)?.classList.add("selected");
            } else if (key == "s") {
                for (let cloth of cloths) {
                    cloth.brushStyle = BrushType.Square;
                }
                document.querySelector("#tool-row button.selected")?.classList.remove("selected");
                document.querySelector(`#tool-row button[data-tool="${cloths[0].brushStyle}"]`)?.classList.add("selected");
            } else if (key == "r") {
                for (let cloth of cloths) {
                    cloth.brushStyle = BrushType.Picker;
                }
                document.querySelector("#tool-row button.selected")?.classList.remove("selected");
                document.querySelector(`#tool-row button[data-tool="${cloths[0].brushStyle}"]`)?.classList.add("selected");
            }
        }

        if (event.ctrlKey && key === "n") {
            event.preventDefault();
            handleNewModel();
        } else if (event.ctrlKey && key === "s") {
            event.preventDefault();
            handleSaveModel();
        } else if (event.ctrlKey && key === "o") {
            event.preventDefault();
            handleOpenDialog();
        } else if ((event.ctrlKey && key === "y") || (event.ctrlKey && event.shiftKey && key == "z")) {
            event.preventDefault();
            if (activeCloth)
                activeCloth.redo();
        } else if (event.ctrlKey && key === "z") {
            event.preventDefault();
            if (activeCloth)
                activeCloth.undo();
        }
    });

    loadFileButton.addEventListener("click", () => {
        loadInput.click();
    });

    function finishFileNameEdit({ commit }) {
        if (!fileNameContainer.classList.contains("editing"))
            return;
        fileNameContainer.classList.remove("editing");
        if (!commit) {
            updateFileNameDisplay();
            return;
        }
        const trimmedName = fileNameInput.value.trim();
        const nextName = trimmedName || "Untitled";
        confirmOverwriteIfExists(nextName).then((shouldOverwrite) => {
            if (!shouldOverwrite) {
                updateFileNameDisplay();
                return;
            }
            setCurrentFileName(nextName);
            setHasUnsavedChanges(true);
        });
    }

    function startFileNameEdit() {
        fileNameInput.value = normalizeModelName(currentFileName);
        fileNameContainer.classList.add("editing");
        fileNameInput.focus();
        fileNameInput.select();
    }

    fileNameContainer.addEventListener("click", (event) => {
        if (event.target === fileNameInput)
            return;
        if (fileNameContainer.classList.contains("editing"))
            return;
        startFileNameEdit();
    });

    fileNameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            finishFileNameEdit({ commit: true });
        } else if (event.key === "Escape") {
            event.preventDefault();
            finishFileNameEdit({ commit: false });
        }
    });

    fileNameInput.addEventListener("blur", () => {
        finishFileNameEdit({ commit: true });
    });

    loadInput.addEventListener("change", async (e)  => {
        const files = e.target.files;
        if (files.length == 0)
            return;
        const file = files[0];
        loadFileName.textContent = file.name;
        if (!confirmDiscardIfDirty()) {
            loadInput.value = "";
            return;
        }
        await loadZipAndCloseDialog(
            file,
            file.name
                .replace(/\.zip$/i, "")
                .replace(/\.csz$/i, "")
        );
    });

    document.querySelectorAll("button[value='cancel']").forEach(b => {
        b.addEventListener("click", () => {
            const dialog = b.closest("dialog");
            dialog?.close("cancel");
        });
    });

    function updateExportParamsVisibility() {
        const selectedFormat = exportFormatInputs.find((input) => input.checked)?.value;
        exportParamsPanels.forEach((panel) => {
            const isActive = panel.dataset.exportFormat === selectedFormat;
            panel.disabled = !isActive;
        });
    }

    exportFormatInputs.forEach((input) => {
        input.addEventListener("change", updateExportParamsVisibility);
    });

    updateExportParamsVisibility();

    saveDialog.addEventListener("close", async () => {
        if (saveDialog.returnValue !== "save" || !pendingSaveData) {
            pendingSaveData = null;
            return;
        }
        const { blob, previewBlob } = pendingSaveData;
        const nextName = saveDialogName.value;
        const shouldOverwrite = await confirmOverwriteIfExists(nextName);
        if (!shouldOverwrite) {
            pendingSaveData = null;
            return;
        }
        commitSave({ name: nextName, blob, previewBlob }).finally(() => {
            setCurrentFileName(nextName);
            pendingSaveData = null;
        });
    });

    async function handleSaveModel() {
        let zip = new JSZip();

        let metadata = {};
        metadata["version"] = 1;
        metadata["palette"] = paletteElem.getColors();
        zip.file("metadata.json",
                 new Blob([JSON.stringify(metadata)],
                          {type: "application/json"})
                );

        let boundingBoxVisibility = boundingBox.visible;
        let cursorVisibility = cursor.visible;
        boundingBox.visible = false;
        cursor.visible = false;
        renderer.render(scene, camera); // Need to do this before taking a 'screenshot'
        boundingBox.visible = boundingBoxVisibility;
        cursor.visible = cursorVisibility;
        const previewBlob = await new Promise(resolve => document.getElementById("three-canvas").toBlob(resolve));
        zip.file("thumbnail.png", previewBlob);

        for (const cloth of cloths) {
            let folder = zip.folder(cloth.id);

            for (const [i, layer] of (await cloth.serialize()).entries()) {
                if (layer.currentBlob() != null)
                    folder.file(`layer-${i}.png`, layer.currentBlob());
            }
        }

        zip.generateAsync({type:"blob"}).then(async (blob) => {
            if (currentFileName != null) {
                const shouldOverwrite = await confirmOverwriteIfExists(currentFileName);
                if (!shouldOverwrite)
                    return;
                await commitSave({ name: currentFileName, blob, previewBlob });
                setCurrentFileName(currentFileName);
                return;
            }

            const thumbnailUrl = previewBlob ? await blobToDataUrl(previewBlob) : emptyThumbnail;
            pendingSaveData = { blob, previewBlob };
            saveDialogThumbnail.src = thumbnailUrl || emptyThumbnail;
            saveDialogName.value = "";
            saveDialog.showModal();
            setTimeout(() => saveDialogName.focus(), 0);
        }).catch((error) => {
            console.error("Save failed", error);
        });
    }

    document.getElementById("save").addEventListener("click", handleSaveModel);

    function disableButtons() {
        const buttons = [...document.querySelectorAll("#buttons *")].filter(elem => elem.tagName === 'BUTTON');
        buttons.forEach((elem) => elem.setAttribute('disabled',''));
        document.documentElement.style.setProperty("--progress", "0%");
        return buttons;
    }
    function enableButtons(buttons) {
        document.documentElement.style.setProperty("--progress", "0%");
        buttons.forEach((elem) => elem.removeAttribute('disabled'));
    }

    async function handleExportSubmit() {
        const buttons = disableButtons();
        const selectedFormat = exportFormatInputs.find((input) => input.checked)?.value ?? "vox";
        const blurRadius = parseInt(exportBlurRadiusInput.value, 10) || 0;
        const blurIterations = parseInt(exportBlurIterationsInput.value, 10) || 0;
        const vertexColors = exportVertexColorsInput.checked;

        const worker = selectedFormat === "vox" ? ExportVoxWorker() : ExportMCWorker();
        const exportFilename = normalizeModelName(currentFileName);

        const initPayload = {
            type: "init",
            totalLayers: 256,
        };

        worker.postMessage(initPayload);

        worker.addEventListener("message", (event) => {
            const message = event.data;
            if (!message)
                return;
            if (message.type === "progress") {
                document.documentElement.style.setProperty("--progress", `${message.percent}%`);
                if (message.stage)
                    console.log(`[Export]: ${message.stage} ${message.percent}%`)
            } else if (message.type === "done") {
                saveAs(message.blob, message.filename);
                enableButtons(buttons);
                worker.terminate();
            }
        });
        worker.addEventListener("error", (event) => {
            console.error("export worker error", event);
            enableButtons(buttons);
            worker.terminate();
        });


        const gpuCompute = new GPUComputationRenderer(256, 256, renderer);
        const test = gpuCompute.createShaderMaterial(`
precision mediump usampler2D;
uniform usampler2D frontViews[${LAYER_COUNT/4}];
uniform usampler2D sideViews[${LAYER_COUNT/4}];
uniform usampler2D topViews[${LAYER_COUNT/4}];
uniform int layerVisibility[${LAYER_COUNT}];
uniform int layer;

${sampleVolumeSnippet}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec3 p = vec3(uv.x, float(layer)/255.0, uv.y);
    gl_FragColor = sampleVolume(vec3(p.x, 1.0 - p.y, p.z));
}
`, {
    layer: { value: null },
    frontViews: { type: "tv", value: null },
    sideViews: { type: "tv", value: null },
    topViews: { type: "tv", value: null },
    layerVisibility: { value: Array(LAYER_COUNT).fill(1) },
});
        test.uniforms.topViews.value = cloths[0].textures;
        test.uniforms.frontViews.value = cloths[1].textures;
        test.uniforms.sideViews.value = cloths[2].textures;
        test.uniforms.layerVisibility.value = Array(LAYER_COUNT).fill(1);

        const error = gpuCompute.init();
        if (error !== null)
            console.error(error);

        let buffer = new Float32Array(256 * 256 * 4);
        let renderTarget = gpuCompute.createRenderTarget();

        for (let layer = 0; layer < 256; layer++) {
            test.uniforms.layer.value = layer;

            gpuCompute.doRenderTarget(test, renderTarget);

            renderer.readRenderTargetPixels(renderTarget, 0, 0, 256, 256, buffer);

            let pixels = new Uint8ClampedArray(256 * 256 * 4);
            for (let i = 0; i < buffer.length/4; i++) {
                pixels[(i * 4) + 0] = buffer[(i * 4) + 0] * 255;
                pixels[(i * 4) + 1] = buffer[(i * 4) + 1] * 255;
                pixels[(i * 4) + 2] = buffer[(i * 4) + 2] * 255;
                pixels[(i * 4) + 3] = buffer[(i * 4) + 3] * 255;
            }

            worker.postMessage({
                type: "layer",
                layer,
                width: 256,
                height: 256,
                pixels: pixels.buffer
            }, [pixels.buffer]);
        }

        const finalizePayload = selectedFormat === "vox"
            ? { type: "finalize", filename: exportFilename }
            : {
                type: "finalize",
                filename: exportFilename,
                blurRadius,
                blurIterations,
                useTexture: !vertexColors
            };
        worker.postMessage(finalizePayload);
    }

    document.getElementById("export").addEventListener("click", () => {
        exportDialog.showModal();
    });

    exportDialog.addEventListener("close", () => {
        if (exportDialog.returnValue !== "export")
            return;
        handleExportSubmit();
    });

//     document.getElementById("export-mc").addEventListener("click", async () => {
//         const buttons = disableButtons();

//         const worker = ExportMCWorker();
//         worker.postMessage({ type: "init", totalLayers: 256 });

//         worker.addEventListener("message", (event) => {
//             const message = event.data;
//             if (!message)
//                 return;
//             if (message.type === "progress") {
//                 document.documentElement.style.setProperty("--progress", `${message.percent}%`);
//             } else if (message.type === "done") {
//                 saveAs(message.blob, message.filename ?? "export.gltf");
//                 enableButtons(buttons);
//                 worker.terminate();
//             }
//         });
//         worker.addEventListener("error", (event) => {
//             console.error("export MC worker error", event);
//             enableButtons(buttons);
//             worker.terminate();
//         });

//         const gpuCompute = new GPUComputationRenderer(256, 256, renderer);
//         const test = gpuCompute.createShaderMaterial(`
// uniform sampler2D frontViews[4];
// uniform sampler2D sideViews[4];
// uniform sampler2D topViews[4];
// uniform int layer;

// ${sampleVolumeSnippet}

// void main() {
//     vec2 uv = gl_FragCoord.xy / resolution.xy;

//     vec3 p = vec3(uv.x, float(layer)/255.0, uv.y);
//     gl_FragColor = sampleVolume(p);
// }
// `, {
//     layer: { value: null },
//     frontViews: { type: "tv", value: null },
//     sideViews: { type: "tv", value: null },
//     topViews: { type: "tv", value: null },
// });
//         test.uniforms.topViews.value = cloths[0].textures;
//         test.uniforms.frontViews.value = cloths[1].textures;
//         test.uniforms.sideViews.value = cloths[2].textures;

//         const error = gpuCompute.init();
//         if (error !== null)
//             console.error(error);

//         let buffer = new Float32Array(256 * 256 * 4);
//         let renderTarget = gpuCompute.createRenderTarget();

//         for (let layer = 0; layer < 256; layer++) {
//             test.uniforms.layer.value = layer;

//             gpuCompute.doRenderTarget(test, renderTarget);

//             renderer.readRenderTargetPixels(renderTarget, 0, 0, 256, 256, buffer);

//             let pixels = new Uint8ClampedArray(256 * 256 * 4);
//             for (let i = 0; i < buffer.length/4; i++) {
//                 pixels[(i * 4) + 0] = buffer[(i * 4) + 0] * 255;
//                 pixels[(i * 4) + 1] = buffer[(i * 4) + 1] * 255;
//                 pixels[(i * 4) + 2] = buffer[(i * 4) + 2] * 255;
//                 pixels[(i * 4) + 3] = buffer[(i * 4) + 3] * 255;
//             }

//             worker.postMessage({
//                 type: "layer",
//                 layer,
//                 width: 256,
//                 height: 256,
//                 pixels: pixels.buffer
//             }, [pixels.buffer]);
//         }

//         worker.postMessage({ type: "finalize", filename: "export.gltf" });
//     });

    function updateLayerVisibilityUniform() {
        const visibility = Array(LAYER_COUNT).fill(1);
        for (let i = 0; i < LAYER_COUNT; i++) {
            visibility[i] = cloths[0].getLayerVisibility(i) ? 1 : 0;
        }
        volumeMaterial.uniforms.layerVisibility.value = visibility;
    }

    [...document.getElementsByTagName("itmas-layer")].forEach((layerTab) => {
        loadingLayers = false;
        let layer = parseInt(layerTab.getAttribute("layer"));

        layerTab.addEventListener("enable", async () => {
            if (loadingLayers) {
                console.warn("Attempted to load layers while loading layers!");
                return;
            }
            loadingLayers = true;
            document.querySelector("itmas-layer.selected")?.classList.remove("selected");
            layerTab.classList.add("selected");

            await Promise.all(cloths.map(c => c.loadLayer(layer)));
            loadingLayers = false;
        });

        layerTab.addEventListener("toggle", (event) => {
            const { hidden } = event.detail || {};
            const isVisible = !hidden;
            cloths.forEach((cloth) => cloth.setLayerVisibility(layer, isVisible));
            updateLayerVisibilityUniform();
        });
    });

    // Create volume box
    const volumeGeometry = new BoxGeometry(1, 1, 1);
    const volumeMaterial = new VolumeMaterial(renderer, {
        topViews: views[0],
        frontViews: views[1],
        sideViews: views[2],
    });
    const volume = new Mesh(volumeGeometry, volumeMaterial);
    scene.add(volume);
    updateLayerVisibilityUniform();

    // Create cursor
    const cursorGeometry = new CylinderGeometry(0.025, 0.025, 1, 16);
    const cursorMaterial = new MeshBasicMaterial({
        color: "#AAA",
        transparent: true,
        opacity: 0.5
    });
    const cursor = new Mesh(cursorGeometry, cursorMaterial);
    cursor.visible = false;
    scene.add(cursor);

    document.getElementById("brush").addEventListener("change", (e) => {
        const size = parseInt(e.target.value)/parseInt(e.target.getAttribute("max")) * 2;
        cursor.scale.set(size, 1, size);
    });

    for (let cloth of cloths) {
        cloth.addEventListener("clothmove", (e) => {
            if (e.target.id == "top-view") {
                cursor.rotation.set(0, 0, 0);
                cursor.position.set(
                    -0.5 + e.detail.x,
                    0,
                    -0.5 + e.detail.y,
                );
            } else if (e.target.id == "side-view") {
                cursor.rotation.set(0, 0, Math.PI / 2);
                cursor.position.set(
                    0,
                    0.5 - e.detail.y,
                    -0.5 + e.detail.x,
                );
            } else if (e.target.id == "front-view") {
                cursor.rotation.set(Math.PI / 2, 0, 0);
                cursor.position.set(
                    -0.5 + e.detail.x,
                    0.5 - e.detail.y,
                    0,
                );
            }
        });
        cloth.addEventListener("pointerover", () => {
            cursor.visible = true;
        });
        cloth.addEventListener("pointerout", () => {
            cursor.visible = false;
        });
    }
});
