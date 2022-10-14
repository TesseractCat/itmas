import './cloth';
import './palette';
import './layer';

import { Scene, PerspectiveCamera, WebGLRenderer,
         Mesh, BoxGeometry, MeshBasicMaterial,
         CanvasTexture } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VolumeMaterial } from './volume';
import JSZip from 'JSZip';

// TODO:
//  - Favicon/meta tags
//  - Jump Flood/SDF
//      - Shading/normals
//  - Light preview of CSG on cloth
//  - Camera:
//      - Expand viewport
//  - Flood fill/paint bucket
//  - Color picker
//  - Layers:
//      - Preview
//  - Undo/Redo

window.addEventListener('load', () => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1.0, 0.1, 1000);
    const canvas = document.getElementById("three-canvas");
    let {width, height} = canvas.getBoundingClientRect();
    // TODO: On resize, resize
    canvas.width = width;
    canvas.height = width;

    const renderer = new WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0xffffff);

    const cloths = [
        document.getElementById("top-view"),
        document.getElementById("front-view"),
        document.getElementById("side-view"),
    ];
    const views = cloths.map(x => x.textures);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 0.4;
    controls.maxDistance = 3;
    controls.enableDamping = true;

    camera.position.z = 1;
    controls.update();

    function render() {
        requestAnimationFrame(render);
        
        controls.update();
        renderer.render(scene, camera);
    }
    render();

    document.getElementById("palette").addEventListener("change", (e) => {
        for (let cloth of cloths)
            cloth.color = e.detail;
    });
    document.getElementById("brush").addEventListener("change", (e) => {
        for (let cloth of cloths)
            cloth.brushSize = parseInt(e.target.value);
    });
    document.getElementById("shape").addEventListener("click", (e) => {
        if (e.target.textContent == "⬤") {
            e.target.textContent = "⯀";
        } else {
            e.target.textContent = "⬤";
        }
        for (let cloth of cloths)
            cloth.brushSquare = !cloth.brushSquare;
    });
    document.getElementById("clear").addEventListener("click", () => {
        if (confirm("Are you sure you want to clear this layer?")) {
            for (let cloth of cloths)
                cloth.clear();
        }
    });
    document.getElementById("save").addEventListener("click", async () => {
        let zip = new JSZip();

        for (const cloth of cloths) {
            let folder = zip.folder(cloth.id);

            for (const [i, layer] of (await cloth.serialize()).entries()) {
                if (layer != null)
                    folder.file(`layer-${i}.png`, layer);
            }
        }

        zip.generateAsync({type:"blob"}).then(function (blob) {
            let blobUrl = URL.createObjectURL(blob);
            let link = document.createElement("a");
            link.href = blobUrl;
            link.download = "model.zip";
            link.click();
        });
    });
    document.getElementById("load").addEventListener("change", async (e)  => {
        const files = e.target.files;
        if (files.length == 0)
            return;
        const file = files[0];
        let zip = new JSZip();
        await zip.loadAsync(file);

        for (const cloth of cloths) {
            let layers = Array(4).fill(null);

            for (let [name, image] of Object.entries(zip.files)) {
                let match = name.match(new RegExp(`${cloth.id}/layer-(\\d+).png`));
                if (match != null) {
                    layers[parseInt(match[1])] = await image.async("blob");
                    layers[parseInt(match[1])] =
                        layers[parseInt(match[1])].slice(0, layers[parseInt(match[1])].size, "image/png");
                }
            }

            await cloth.deserialize(layers);
        }
    });

    [...document.getElementsByTagName("itmas-layer")].forEach((layerTab) => {
        loadingLayers = false;
        let layer = parseInt(layerTab.getAttribute("layer"));

        layerTab.addEventListener("click", async () => {
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
    });

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new VolumeMaterial({
        topViews: views[0],
        frontViews: views[1],
        sideViews: views[2],
    });
    const cube = new Mesh(geometry, material);
    scene.add(cube);
});
