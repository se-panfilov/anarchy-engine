import './style.css';
import { Color, Mesh, MeshToonMaterial, SphereGeometry, Vector3 } from 'three';
import { SceneManager } from '@Engine/Managers/SceneManager';
import { LoopManager } from '@Engine/Managers/LoopManager';
import { CameraManager } from '@Engine/Managers/CameraManager';
import { LightManager } from '@Engine/Managers/LightManager';
import { InputManager } from '@Engine/Managers/InputManager';
import { ActorManager } from '@Engine/Managers/ActorManager';
import { ControlManager } from '@Engine/Managers/ControlManager';
import { DeviceWatcher } from '@Engine/Watchers/DeviceWatcher';
import type { CameraParams } from '@Engine/Wrappers/CameraWrapper';
import { ActorParams } from '@Engine/Wrappers/ActorWrapper';
import { isNotDefined } from '@Engine/Utils';

const deviceWatcher = new DeviceWatcher({
  width: window.innerWidth,
  height: window.innerHeight,
  ratio: window.devicePixelRatio || 1
});

const actorManager = new ActorManager();
const cameraManager = new CameraManager();
const lightManager = new LightManager();
const controlManager = new ControlManager();
const inputManager = new InputManager();
const loopManager = new LoopManager();
const sceneManager = new SceneManager();
const rendererManager = new RendererManager();

const scene = sceneManager.create();
sceneManager.setCurrent(scene);

// sceneManager.attachManagerToScene(actorManager, scene);
// sceneManager.attachManagerToScene(cameraManager, scene);
// sceneManager.attachManagerToScene(lightManager, scene);
// sceneManager.attachManagerToScene(inputManager, scene);

const actorParams: Partial<ActorParams> = {
  width: 1,
  height: 32,
  heightSegments: 32,
  materialParams: { color: new Color('#5EDCAE') }
};
const sphereParams: ActorParams = { ...actorParams, type: 'sphere' };
const planeParams: ActorParams = { ...actorParams, type: 'plane' };
actorManager.create(sphereParams);
actorManager.create(planeParams);

const params: CameraParams = {
  width: deviceWatcher.size$.value.width,
  height: deviceWatcher.size$.value.height,
  fov: 45,
  near: 1,
  far: 10000
};
const wrappedCamera = cameraManager.create(params);
cameraManager.setCurrent(wrappedCamera);
wrappedCamera.setPosition(3, 2, 15);
wrappedCamera.lookAt(0, 0, 0);

if (isNotDefined(cameraManager.current$.value)) throw new Error('Camera is not ready');
if (isNotDefined(rendererManager.current$.value)) throw new Error('Renderer is not ready');
const wrappedControl = controlManager.create(cameraManager.current$.value, rendererManager.current$.value);
wrappedControl.entity.wrappedCamera.setControls('OrbitControls');

lightManager.createAmbientLight({ type: 'ambient', color: 0xffffff, intensity: 0.5 });
const wrappedDirectionalLight = lightManager.createDirectionalLight({
  type: 'directional',
  color: '#ffffff',
  intensity: 1
});
wrappedDirectionalLight.light.castShadow = true;
wrappedDirectionalLight.light.shadow.mapSize.set(1024, 1024);
wrappedDirectionalLight.light.shadow.camera.far = 15;
wrappedDirectionalLight.light.shadow.normalBias = 0.05;
wrappedDirectionalLight.light.position.set(0.25, 2, 2.25);

inputManager.initMousePointer().addIntersectionPointer().onClick(onMouseClick);

loopManager.start();

// TODO (S.Panfilov) move it to any other place
function onMouseClick({ x, y, z }: Vector3, event: MouseEvent): void {
  event.preventDefault();
  const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshToonMaterial({ color: new Color('#5EDCAE') }));
  sphere.position.set(x, y, z);
  sphere.castShadow = true;
  scene.add(sphere);
}
