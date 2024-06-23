import * as THREE from 'three';
import './style.css'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

//Scence
//Mesh
//camera
//render

const canvas = document.querySelector('canvas.webgl')

//Scence
const scene = new THREE.Scene();

//Mesh
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:"red"});
// cubeMaterial.color = "red";
const cubeMesh = new THREE.Mesh(
    cubeGeometry,
    cubeMaterial
);

scene.add(cubeMesh);



//camera
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)

scene.add(camera)
camera.position.z = 5;

//render
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(window.innerWidth, window.innerHeight)

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//control
const control = new OrbitControls(camera, canvas);
control.enableDamping;

const clock = new THREE.Clock()
let currentTime = 0;


const renderLoop = () => {

    const elapsedTime = clock.getElapsedTime();
    let time = currentTime / elapsedTime;

    window.requestAnimationFrame(renderLoop)
    renderer.render(scene,camera)

    control.update();
}

renderLoop();