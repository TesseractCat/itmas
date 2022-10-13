import './cloth';
import './palette';
import './layer';

import { Scene, PerspectiveCamera, WebGLRenderer,
         Mesh, BoxGeometry, MeshBasicMaterial,
         CanvasTexture } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VolumeMaterial } from './volume';

window.onload = function() {
    const scene = new Scene();
    const camera = new PerspectiveCamera( 75, 1.0, 0.1, 1000 );
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
    document.getElementById("clear").addEventListener("click", () => {
        for (let cloth of cloths)
            cloth.clear();
    });

    function addLayer() {
        const layers = document.getElementById("layers");
        let layer = parseInt(layers.dataset.count);
        layers.dataset.count = layer + 1;

        let layerTab = document.createElement("itmas-layer");
        layerTab.setAttribute("layer", layers.dataset.count);
        layerTab.addEventListener("click", () => {
            document.querySelector("itmas-layer.selected")?.classList.remove("selected");
            layerTab.classList.add("selected");
            for (let cloth of cloths) {
                cloth.loadLayer(layer);
            }
        });
        layers.children[1].after(layerTab);

        for (let cloth of cloths) {
            cloth.addLayer();
        }
        layerTab.click();
    }

    document.getElementById("add-layer").addEventListener("click", () => {
        addLayer();
    });
    addLayer();

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new VolumeMaterial({
        topViews: views[0],
        frontViews: views[1],
        sideViews: views[2],
    });
    const cube = new Mesh(geometry, material);
    scene.add(cube);
};
