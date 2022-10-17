import { BrushType } from './cloth';
import './palette';
import './layer';

import { Scene, PerspectiveCamera, OrthographicCamera, WebGLRenderer,
         Mesh, BoxGeometry, MeshBasicMaterial,
         CanvasTexture } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js';

import { VolumeMaterial, sampleVolumeSnippet } from './volume';
import { MagicaVoxel } from './vox';
import JSZip from 'JSZip';

// TODO:
//  - Favicon/meta tags
//  - Jump Flood/SDF:
//      - Shading/normals
//  - Canvas:
//      - Flood fill/paint bucket
//      - Light preview of CSG on cloth
//      - Undo/Redo
//      - Straight line tool
//      - Color picker
//  - Layers:
//      - Preview
//      - Hide/show

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
    canvas.width = width;
    canvas.height = width;

    const renderer = new WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0xffffff);

    // FIXME: Inconsistent ordering!
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
            cloth.brushSize = parseInt(e.target.value)/parseInt(e.target.getAttribute("max"));
    });
    document.getElementById("shape").addEventListener("click", (e) => {
        if (e.target.textContent == "⬤") {
            e.target.textContent = "⯀";
        } else {
            e.target.textContent = "⬤";
        }
        for (let cloth of cloths) {
            if (cloth.brushStyle == BrushType.Circle) {
                cloth.brushStyle = BrushType.Square;
            } else {
                cloth.brushStyle = BrushType.Circle;
            }
        }
    });
    document.getElementById("clear").addEventListener("click", () => {
        if (confirm("Are you sure you want to clear this layer?")) {
            for (let cloth of cloths)
                cloth.clear();
        }
    });
    document.getElementById("expand").addEventListener("click", () => {
        for (let cloth of cloths)
            cloth.style.display = cloth.style.display == "none" ? "block" : "none";
        let grid = document.getElementById("grid");
        grid.style.display = grid.style.display == "block" ? "grid" : "block";
    });
    
    document.getElementById("save").addEventListener("click", async () => {
        let zip = new JSZip();

        let metadata = {};
        metadata["version"] = 1;
        metadata["palette"] = palette.getColors();
        zip.file("metadata.json",
                 new Blob([JSON.stringify(metadata)],
                          {type: "application/json"})
                );

        renderer.render(scene, camera); // Need to do this before taking a 'screenshot'
        const previewBlob = await new Promise(resolve => document.getElementById("three-canvas").toBlob(resolve));
        console.log(previewBlob);
        zip.file("thumbnail.png", previewBlob);

        for (const cloth of cloths) {
            let folder = zip.folder(cloth.id);

            for (const [i, layer] of (await cloth.serialize()).entries()) {
                if (layer != null)
                    folder.file(`layer-${i}.png`, layer);
            }
        }

        zip.generateAsync({type:"blob"}).then(async (blob) => {
            saveAs(blob, "model.zip");
        });
    });
    async function loadZip(file) {
        let zip = new JSZip();
        await zip.loadAsync(file);

        for (const cloth of cloths) {
            let layers = Array(4).fill(null);

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

        let metadataFile = zip.file("metadata.json");
        if (metadataFile != null) {
            let metadata = JSON.parse(await metadataFile.async("string"));

            if ("palette" in metadata) {
                palette.setColors(metadata["palette"]);
            }
        }
    }
    document.getElementById("load").addEventListener("change", async (e)  => {
        const files = e.target.files;
        if (files.length == 0)
            return;
        const file = files[0];

        await loadZip(file);
    });
    document.getElementById("examples").addEventListener("change", async (e) => {
        let file = await (await fetch(`./models/${e.target.value}.zip`)).blob();
        await loadZip(file);
    });
    document.getElementById("export").addEventListener("click", async () => {
        [...document.querySelectorAll("#buttons *")]
            .forEach((elem) => elem.setAttribute('disabled',''));
        
        let zip = new JSZip();
        let vox = new MagicaVoxel();

        const gpuCompute = new GPUComputationRenderer(256, 256, renderer);
        const test = gpuCompute.createShaderMaterial(`
uniform sampler2D frontViews[4];
uniform sampler2D sideViews[4];
uniform sampler2D topViews[4];
uniform int layer;

${sampleVolumeSnippet}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec3 p = vec3(uv.x, float(layer)/255.0, uv.y);
    gl_FragColor = sampleVolume(p);
}
`, {
    layer: { value: null },
    frontViews: { type: "tv", value: null },
    sideViews: { type: "tv", value: null },
    topViews: { type: "tv", value: null },
});
        test.uniforms.topViews.value = cloths[0].textures;
        test.uniforms.frontViews.value = cloths[1].textures;
        test.uniforms.sideViews.value = cloths[2].textures;

        const error = gpuCompute.init();
        if (error !== null)
            console.error(error);

        let buffer = new Float32Array(256 * 256 * 4);
        let renderTarget = gpuCompute.createRenderTarget();

        const exportCanvas = document.createElement("canvas");
        exportCanvas.width = 256;
        exportCanvas.height = 256;
        const ctx = exportCanvas.getContext("2d");

        let pixels = new Uint8ClampedArray(256 * 256 * 4);

        for (let layer = 0; layer < 256; layer++) {
            document.documentElement.style.setProperty("--progress", `${(layer/256)*100}%`);

            test.uniforms.layer.value = layer;

            gpuCompute.doRenderTarget(test, renderTarget);

            renderer.readRenderTargetPixels(renderTarget, 0, 0, 256, 256, buffer);

            for (let i = 0; i < buffer.length/4; i++) {
                pixels[(i * 4) + 0] = buffer[(i * 4) + 0] * 255;
                pixels[(i * 4) + 1] = buffer[(i * 4) + 1] * 255;
                pixels[(i * 4) + 2] = buffer[(i * 4) + 2] * 255;
                pixels[(i * 4) + 3] = buffer[(i * 4) + 3] * 255;

                if (pixels[(i * 4) + 3] > 128) {
                    let x = i % 256;
                    let y = Math.floor(i/256);
                    vox.addVoxel([x, y, layer],
                                 (pixels[(i * 4) + 0] << 24) |
                                 (pixels[(i * 4) + 1] << 16) |
                                 (pixels[(i * 4) + 2] << 8)  |
                                 (pixels[(i * 4) + 3] << 0)
                                );
                }
            }
            let imageData = new ImageData(pixels, 256, 256);
            ctx.putImageData(imageData, 0, 0);

            // const blob = await new Promise(resolve => exportCanvas.toBlob(resolve));
            // zip.file(`${String(layer).padStart(3, '0')}.png`, blob);
        }
        document.documentElement.style.setProperty("--progress", "0%");

        let blob = vox.toBlob();
        saveAs(blob, "export.vox");

        // zip.generateAsync({type:"blob"}).then(async (blob) => {
        //     saveAs(blob, "export.zip");
        // });
        [...document.querySelectorAll("#buttons *")]
            .forEach((elem) => elem.removeAttribute('disabled'));
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
