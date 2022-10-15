import './cloth';
import './palette';
import './layer';

import { Scene, PerspectiveCamera, OrthographicCamera, WebGLRenderer,
         Mesh, BoxGeometry, MeshBasicMaterial,
         CanvasTexture } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js';

import { VolumeMaterial, sampleVolumeSnippet } from './volume';
import JSZip from 'JSZip';

// TODO:
//  - Favicon/meta tags
//  - Jump Flood/SDF
//      - Shading/normals
//  - Cursor preview
//  - Light preview of CSG on cloth
//  - Flood fill/paint bucket
//  - Color picker
//  - Layers:
//      - Preview
//  - Undo/Redo
//  - https://wiki.linuxquestions.org/wiki/Embed_a_zip_file_into_an_image

function saveAs(blob, name) {
    const blobUrl = URL.createObjectURL(blob);

    let link = document.createElement("a");
    link.href = blobUrl;
    link.download = name;
    link.rel = "noopener";
    setTimeout(() => { URL.revokeObjectURL(blobUrl); }, 4E4);
    setTimeout(() => { link.dispatchEvent(new MouseEvent("click")); }, 0);
}

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
    document.getElementById("expand").addEventListener("click", () => {
        for (let cloth of cloths)
            cloth.style.display = cloth.style.display == "none" ? "block" : "none";
        let grid = document.getElementById("grid");
        grid.style.display = grid.style.display == "block" ? "grid" : "block";
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

        zip.generateAsync({type:"blob"}).then(async (blob) => {
            // const previewBlob = await new Promise(resolve => document.getElementById("three-canvas").toBlob(resolve));
            // const combinedBlob = new Blob([previewBlob, blob], {type: "image/png"});
            saveAs(blob, "model.zip");
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
                    // FIXME: Is this necessary?
                    layers[parseInt(match[1])] =
                        layers[parseInt(match[1])].slice(0, layers[parseInt(match[1])].size, "image/png");
                }
            }

            await cloth.deserialize(layers);
        }
    });
    /*document.getElementById("export").addEventListener("click", async () => {
        let colors = [];
        for (let layer = 0; layer < 4; layer++) {
            let layerColors = [];
            for (const cloth of cloths) {
                await cloth.loadLayer(layer);
                
                layerColors.push(cloth.ctx.getImageData(0, 0, 256, 256));
            }
            colors.push(layerColors);
        }

        // let layerCanvas = document.createElement("canvas");
        // layerCanvas.width = 256;
        // layerCanvas.height = 256;
        // let ctx = layerCanvas.getContext("2d");

        let ply = `ply
format ascii 1.0
element vertex COUNT
property float x
property float y
property float z
property uchar red
property uchar green
property uchar blue
end_header
`;
        let vertexCount = 0;

        //let zip = new JSZip();

        for (let y = 0; y < 256; y++) {
            console.log(y);
            //ctx.clearRect(0, 0, 256, 256);
            for (let z = 0; z < 256; z++) {
                for (let x = 0; x < 256; x++) {
                    let line = null;

                    for (let layer = 0; layer < 4; layer++) {
                        let frontView = colors[layer][0].data;
                        let sideView = colors[layer][1].data;
                        let topView = colors[layer][2].data;

                        let t =   topView.slice((z * 256 + x) * 4,
                                                (z * 256 + x + 1) * 4);
                        let f = frontView.slice(((255-y) * 256 + x) * 4,
                                                ((255-y) * 256 + x + 1) * 4);
                        let s =  sideView.slice(((255-y) * 256 + z) * 4,
                                                ((255-y) * 256 + z + 1) * 4);

                        if (t[3] > 128 && f[3] > 128 && s[3] > 128) {
                            let c = f;
                            if (
                                (t[0] == f[0] && t[1] == f[1]
                                 && t[2] == f[2] && t[3] == f[3]) ||
                                    (t[0] == s[0] && t[1] == s[1]
                                     && t[2] == s[2] && t[3] == s[3])
                            ) {
                                c = t;
                            }
                            // ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${c[3]})`;
                            // ctx.fillRect(x, y, 1, 1);
                            line = `${x} ${y} ${z} ${c[0]} ${c[1]} ${c[2]}\n`;
                        }
                    }

                    if (line != null) {
                        ply += line;
                        vertexCount += 1;
                    }
                }
            }
            //const blob = await new Promise(resolve => layerCanvas.toBlob(resolve));
            //zip.file(`${z}.png`, blob);
        }

        // zip.generateAsync({type:"blob"}).then(async (blob) => {
        //     saveAs(blob, "export.zip");
        // });
        ply = ply.replace("COUNT", vertexCount);
        let blob = new Blob([ply]);
        saveAs(blob, "export.ply");
    });*/
    document.getElementById("export").addEventListener("click", async () => {
        let zip = new JSZip();

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

            for (let i = 0; i < buffer.length; i++) {
                pixels[i] = Math.floor(buffer[i] * 256);
            }
            let imageData = new ImageData(pixels, 256, 256);
            ctx.putImageData(imageData, 0, 0);

            const blob = await new Promise(resolve => exportCanvas.toBlob(resolve));
            zip.file(`${String(layer).padStart(3, '0')}.png`, blob);
        }
        document.documentElement.style.setProperty("--progress", "0%");

        zip.generateAsync({type:"blob"}).then(async (blob) => {
            saveAs(blob, "export.zip");
        });
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
