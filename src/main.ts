import './style.css';
import { Scene } from 'three';
import { renderer, updateRenderer } from './renderer';
import { camera } from './camera';
import { ambientLight, directionalLight } from './lights';
import { sphere } from './sphere';
import { plane } from './planne';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new Scene();
scene.add(sphere);
scene.add(plane);
scene.add(camera);
scene.add(ambientLight);
scene.add(directionalLight);

updateRenderer();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const loop = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};

loop();
