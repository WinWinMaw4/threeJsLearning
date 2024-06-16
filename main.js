import './style.css'
import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl');
console.log(canvas)

//Scene
const scene = new THREE.Scene();


//Mesh 
const geometry = new THREE.TorusGeometry( 0.3, 0.2, 32 , 64 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const knotMesh = new THREE.Mesh(geometry,material);
scene.add(knotMesh);



const camera = new THREE.PerspectiveCamera(
  45, 
  window.innerWidth / window.innerHeight, 
  0.1 ,1000 )
  scene.add(camera)
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 4;


// Renderer 
const renderer = new THREE.WebGLRenderer({
  canvas : canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render( scene, camera )

const clock = new THREE.Clock();
console.log(clock)



function animate() {

    const elapsedTime = clock.getElapsedTime()
  
    knotMesh.rotation.x = 0.2 * elapsedTime
    knotMesh.rotation.y = 0.2 * elapsedTime

    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
	
}

animate()