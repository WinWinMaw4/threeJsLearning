import * as THREE from 'three';
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

const loader = new THREE.TextureLoader();
const texture = loader.load('./background.jpg', () => {
    scene.background = texture;
});

// Gradient texture
const canvasTexture = document.createElement('canvas');
canvasTexture.width = 256;
canvasTexture.height = 256;
const context = canvasTexture.getContext('2d');

// Function to create gradient based on time
const updateGradientTexture = (time) => {
    const gradient = context.createLinearGradient(0, 0, 256, 256);
    
    // Calculate dynamic colors based on time
    const color1 = `hsl(${(time * 30) % 360}, 100%, 50%)`;
    const color2 = `hsl(${(time * 30 + 120) % 360}, 100%, 50%)`;
    const color3 = `hsl(${(time * 30 + 240) % 360}, 100%, 50%)`;
    
    gradient.addColorStop(0, color1);
    gradient.addColorStop(0.5, color2);
    gradient.addColorStop(1, color3);
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
};

// Initialize the gradient texture
updateGradientTexture(0);
const gradientTexture = new THREE.CanvasTexture(canvasTexture);

// Mesh
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

const glassMaterial = new THREE.MeshPhysicalMaterial({
    map: gradientTexture,
    metalness: 0,
    roughness: 0,
    transmission: 1, // Transmission property makes the material transparent like glass
    thickness: 0.5, // Thickness of the glass
    envMap: texture, // Environment map for reflections
    clearcoat: 1,
    clearcoatRoughness: 0
});

const cubeMesh = new THREE.Mesh(
    cubeGeometry,
    glassMaterial,
);

scene.add(cubeMesh);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Camera
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

scene.add(camera);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
});

renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Control
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

const clock = new THREE.Clock();

const renderLoop = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update the gradient texture
    updateGradientTexture(elapsedTime);
    gradientTexture.needsUpdate = true;

    cubeMesh.rotation.x = elapsedTime;
    cubeMesh.rotation.y = elapsedTime;

    window.requestAnimationFrame(renderLoop);
    renderer.render(scene, camera);

    control.update();
};

renderLoop();
