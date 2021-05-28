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
scene.background = new THREE.Color(0x0000ff);
//create objects and stuff

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
