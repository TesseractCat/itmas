import './cloth';
import { Scene, PerspectiveCamera, WebGLRenderer,
         Mesh, BoxGeometry, MeshBasicMaterial } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

window.onload = function() {
    const scene = new Scene();
    const camera = new PerspectiveCamera( 75, 1.0, 0.1, 1000 );
    const canvas = document.getElementById("three-canvas");
    let {width, height} = canvas.getBoundingClientRect();
    // TODO: On resize, resize
    canvas.width = width;
    canvas.height = width;

    const renderer = new WebGLRenderer({canvas: canvas});

    const geometry = new BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new Mesh( geometry, material );
    scene.add( cube );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    camera.position.z = 2;
    controls.update();

    function render() {
        requestAnimationFrame(render);
        controls.update();
        renderer.render(scene, camera);
    }
    render();
};


