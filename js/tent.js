import * as THREE from './three/build/three.module.js';
import {GLTFLoader} from './three/examples/jsm/loaders/GLTFLoader.js';

export function Tent(scene) {
  var mesh;
  var file = './models/tent.glb';
  var loaded = false;
  const loader = new GLTFLoader(THREE.DefaultLoadingManager);

  loader.load(file, function(gltf) {
    mesh = gltf.scene;

    mesh.traverse(function(child) {
      console.log(child);
    });

    mesh.scale.set(0.5,0.5,0.5);
    mesh.position.set(3,0,0);
    mesh.rotation.y = THREE.Math.degToRad(45);
    scene.add(mesh);

    loaded = true;
  },
  function(xhr) {
    console.log( 'tent', ( xhr.loaded / xhr.total * 100) + '% loaded' );
  },
  function(error) {
    console.warn('something went wrong!', error);
  });

  this.update = function(delta, upTime) {
    if(loaded) {
      mesh.rotation.z += delta;
    }
  }
}
