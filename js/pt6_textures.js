import * as THREE from "./three/build/three.module.js";
import {OrbitControls} from "./three/examples/jsm/controls/OrbitControls.js";

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
//position camera and create controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3();
camera.position.set(1,2,10);
controls.update();
//create objects and stuff
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//textures
const diff = new THREE.TextureLoader().load('../images/lava2_DIFF.jpg');
const nrm = new THREE.TextureLoader().load('../images/lava2_NRM.jpg');
const emit = new THREE.TextureLoader().load('../images/lava2_EMIT.jpg');

//cube
var geometry = new THREE.BoxGeometry(1,3,0.7);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
const cube = new THREE.Mesh( geometry, material );
cube.scale.set(2,2,2);
cube.position.set(4, 1.5, 0);
scene.add( cube );
//sphere
geometry = new THREE.SphereGeometry(1,16,16);
const standardMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.6,
  metalness: 0.0,
  map: diff,
  normalMap: nrm,
  emissive: new THREE.Color(1,1,1),
  emissiveMap: emit});
const sphere = new THREE.Mesh(geometry, standardMaterial);
sphere.position.set(-4, 0, 0);
scene.add( sphere );
//torus
geometry = new THREE.TorusGeometry(1,0.7, 32, 32);
const phongMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 150 })
const torus = new THREE.Mesh(geometry, phongMaterial);
torus.position.set(0,0,2);
scene.add(torus);

//lights
const ambientLight = new THREE.AmbientLight(new THREE.Color(0.5,0.5,0.5), 1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(new THREE.Color(1,1,1), 1);
scene.add(directionalLight);
//animate functions
function animate() {
  requestAnimationFrame(animate);
  controls.update();
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
