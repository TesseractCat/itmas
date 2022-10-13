import './cloth';
import './palette';
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

    const views = [
        document.getElementById("top-view").textures[0],
        document.getElementById("front-view").textures[0],
        document.getElementById("side-view").textures[0],
    ];

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new VolumeMaterial({
        topView: views[0],
        frontView: views[1],
        sideView: views[2],
    });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

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
        for (let cloth of document.getElementsByTagName("itmas-cloth")) {
            cloth.color = e.detail;
        }
    });
    document.getElementById("clear").addEventListener("click", () => {
        for (let cloth of document.getElementsByTagName("itmas-cloth")) {
            cloth.clear();
        }
    })
};
