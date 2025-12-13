import './style.css';
import { Color, Mesh, MeshToonMaterial, Scene, SphereGeometry, Vector3 } from 'three';
import { IntersectionPointer, MousePointer } from './Pointer';
import { RendererWrapper } from './Renderer/RendererWrapper';
import { CameraWrapper } from './Camera/CameraWrapper';
import { ambientLight, directionalLight } from './lights';
import { sphere } from './sphere';
import { plane } from './planne';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { fpsGraph } from './DeveloperPanel';
import { startWatchResize } from './Watchers/Device/ResizeWatcher';
import { deviceSize$ } from './Store/DeviceSize';

const scene = new Scene();
scene.add(sphere);
scene.add(plane);

const { camera } = CameraWrapper(window.innerWidth, window.innerHeight);
camera.position.set(3, 2, 15);
camera.lookAt(0, 0, 0);
scene.add(camera);

startWatchResize();

scene.add(ambientLight);
scene.add(directionalLight);

//init screen
deviceSize$.next({
  width: window.innerWidth,
  height: window.innerHeight,
  devicePixelRatio: 2
});
const { renderer } = RendererWrapper('#app');
const controls = new OrbitControls(camera, renderer.domElement);
// new OrbitControls(directionalLight as any, renderer.domElement);
controls.enableDamping = true;

const intersectionPointer = IntersectionPointer(MousePointer(), camera, scene.children);

intersectionPointer.click$.subscribe(({ position, event }) => onMouseClick(position, event));

const loop = () => {
  (fpsGraph as any).begin();
  renderer.render(scene, camera);

  (fpsGraph as any).end();
  requestAnimationFrame(loop);
};

loop();

function onMouseClick({ x, y, z }: Vector3, event: MouseEvent): void {
  event.preventDefault();
  const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshToonMaterial({ color: new Color('#5EDCAE') }));
  sphere.position.set(x, y, z);
  sphere.castShadow = true;
  scene.add(sphere);
}
