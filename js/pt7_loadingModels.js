import * as THREE from "./three/build/three.module.js";
import {OrbitControls} from "./three/examples/jsm/controls/OrbitControls.js";
import {Tent} from './tent.js';

const canvas = document.getElementById('canvas');

//clock
const clock = new THREE.Clock();
var prevTime = performance.now();
var upTime = 0;
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

//sphere
const geometry = new THREE.SphereGeometry(2,16,16);
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

//tent
const tent = new Tent(scene);

//lights
const ambientLight = new THREE.AmbientLight(new THREE.Color(0.5,0.5,0.5), 1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(new THREE.Color(1,1,1), 1);
scene.add(directionalLight);
//animate functions
function animate() {
  var currentTime = performance.now();
  var delta = (currentTime - prevTime) / 1000;
  prevTime = currentTime;
  upTime += delta;
  requestAnimationFrame(animate);
  //do things!
  sphere.rotation.y += delta;
  //change emission strength
  sphere.material.emissiveIntensity = Math.sin(upTime) + 1;
  //update tent
  tent.update(delta, upTime);

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
