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
scene.background = new THREE.Color(0x87CEEB); // Black color

const loader = new THREE.TextureLoader();
const texture = loader.load('./background.jpg', () => {
    scene.background = texture;
});


// Gradient texture
const canvasTexture = document.createElement('canvas');
canvasTexture.width = 256;
canvasTexture.height = 256;
const context = canvasTexture.getContext('2d');
const gradient = context.createLinearGradient(0, 0, 256, 256);
gradient.addColorStop(0, 'skyblue');
gradient.addColorStop(1, 'blue');

context.fillStyle = gradient;
context.fillRect(0, 0, 256, 256);

const gradientTexture = new THREE.CanvasTexture(canvasTexture);


//Mesh
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
// const cubeMaterial = new THREE.MeshBasicMaterial({color:"red"});
const cubeMaterial = new THREE.MeshStandardMaterial({ map: gradientTexture });

// cubeMaterial.color = "red";
const cubeMesh = new THREE.Mesh(
    cubeGeometry,
    cubeMaterial
);

scene.add(cubeMesh);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);


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

    cubeMesh.rotation.x = elapsedTime;
    cubeMesh.rotation.y = elapsedTime;


    window.requestAnimationFrame(renderLoop)
    renderer.render(scene,camera)

    control.update();
}

renderLoop();