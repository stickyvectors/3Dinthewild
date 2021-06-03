import * as THREE from "./three/build/three.module.js";

const canvas = document.getElementById('canvas');

//basic setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
renderer.setPixelRatio(DPR);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

bindEventListeners();

//scene background
scene.background = new THREE.Color(0.5,0.5,0.5);
//position camera
camera.position.set(1,2,10);
camera.lookAt(new THREE.Vector3());
//create objects and stuff
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
//animate functions
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
//begin animating
animate();

//resize functions
function bindEventListeners() {
  window.onresize = resizeCanvas;
  resizeCanvas();
}

function resizeCanvas() {
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const {width, height} = canvas;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
