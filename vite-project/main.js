import './style.css'


import * as THREE from 'three';

// Init the window
const renderer = new THREE.WebGLRenderer(
  window.innerWidth,
  window.innerHeight
);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild( renderer.domElement );


// Init the camera
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  1, 
  1000);
camera.position.set(0,0,5);
camera.lookAt(0,0,0);

// Init The scene
const scene = new THREE.Scene();


// Init Object 
const boxGeometry = new THREE.BoxGeometry(
  3, // x
  3, // y
  3  // z
);

const planeGeometry = new THREE.PlaneGeometry(
  5,
  5,
  10,
  10
  );

// Customize object
const material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading
});

// Init Light
const light = new THREE.DirectionalLight(
  0xffffff, // light color
  3
);
light.position.set(-0.2,0.5,1);
scene.add(light);

// compile geometry and material
const mesh = new THREE.Mesh(planeGeometry,material);

// ADD Object to scene
scene.add(mesh);
renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  //mesh.rotation.x += 0.05;
}

animate();



