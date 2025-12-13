import './style.css';
import { Color, Mesh, MeshToonMaterial, Raycaster, Scene, SphereGeometry, Vector2 } from 'three';
import { renderer, updateRenderer } from './renderer';
import { camera } from './camera';
import { ambientLight, directionalLight } from './lights';
import { sphere } from './sphere';
import { plane } from './planne';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { fpsGraph, pane } from './DeveloperPanel';
import { Intersection } from 'three/src/core/Raycaster';
import { Object3D } from 'three/src/core/Object3D';

const scene = new Scene();
scene.add(sphere);
scene.add(plane);
scene.add(camera);
scene.add(ambientLight);
scene.add(directionalLight);

updateRenderer();

const controls = new OrbitControls(camera, renderer.domElement);
// new OrbitControls(directionalLight as any, renderer.domElement);
controls.enableDamping = true;

// const mouse = new Vector2( 1, 1 );
const mouse = new Vector2();
const rayCaster = new Raycaster();
let intersectObjects: ReadonlyArray<Intersection<Object3D>>;

const loop = () => {
  (fpsGraph as any).begin();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);

  rayCaster.setFromCamera(mouse, camera);
  intersectObjects = rayCaster.intersectObjects(scene.children);

  (fpsGraph as any).end();
};

loop();

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseClick);

function onMouseMove(event: MouseEvent): void {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick(event: MouseEvent): void {
  event.preventDefault();

  const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshToonMaterial({ color: new Color('#5EDCAE') }));

  sphere.position.copy(intersectObjects[0].point);
  sphere.castShadow = true;
  scene.add(sphere);
}

const mousePane = pane.addFolder({
  title: 'Mouse Position',
  expanded: true
});

mousePane.addMonitor(mouse, 'x');
mousePane.addMonitor(mouse, 'y');
