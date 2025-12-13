import './style.css';
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Mesh,
  MeshToonMaterial,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  WebGL1Renderer
} from 'three';

const scene = new Scene();

const VERTICAL_FIELD_OF_VIEW = 45;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

export const camera = new PerspectiveCamera(VERTICAL_FIELD_OF_VIEW, sizes.width / sizes.height);

camera.position.set(3, 2, 15);

// Lights
const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new DirectionalLight('#ffffff', 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 2, 2.25);
scene.add(directionalLight);

const canvas: HTMLElement = document.querySelector('#app') as HTMLElement;

const renderer = new WebGL1Renderer({ canvas });

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFShadowMap;
renderer.physicallyCorrectLights = true;

function updateRenderer(): void {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  updateRenderer();

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
});

const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshToonMaterial({ color: new Color('#5EDCAE') }));

sphere.position.set(0, 2, 0);
sphere.castShadow = true;

scene.add(sphere);

// plane
const plane = new Mesh(new PlaneGeometry(10, 10, 10, 10), new MeshToonMaterial({ color: '#444' }));
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.receiveShadow = true;
scene.add(plane);

scene.add(camera);
updateRenderer();

//controls
const loop = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};

loop();
