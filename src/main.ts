import './style.css';
import { Color, Mesh, MeshToonMaterial, Scene, SphereGeometry, Vector3 } from 'three';
import { renderer, updateRenderer } from './renderer';
import { camera } from './camera';
import { ambientLight, directionalLight } from './lights';
import { sphere } from './sphere';
import { plane } from './planne';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MousePointer } from './Pointer/MousePointer';
import { fpsGraph } from './DeveloperPanel';
import { IntersectionPointer } from './Pointer/IntersectionPointer';

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

const intersectionPointer = IntersectionPointer(MousePointer(), camera, scene.children);

intersectionPointer.click$.subscribe(({ position, event }) => onMouseClick(position, event));

const loop = () => {
  (fpsGraph as any).begin();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
  (fpsGraph as any).end();
};

loop();

function onMouseClick({ x, y, z }: Vector3, event: MouseEvent): void {
  event.preventDefault();
  const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshToonMaterial({ color: new Color('#5EDCAE') }));
  sphere.position.set(x, y, z);
  sphere.castShadow = true;
  scene.add(sphere);
}
