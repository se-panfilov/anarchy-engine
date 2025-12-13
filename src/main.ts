import './style.css';
import { Color } from 'three';
import { SceneManager } from '@Engine/Managers/SceneManager';
import { LoopManager } from '@Engine/Managers/LoopManager';
import { CameraManager } from '@Engine/Managers/CameraManager';
import { LightManager } from '@Engine/Managers/LightManager';
import { ActorManager } from '@Engine/Managers/ActorManager';
import { ControlsManager } from '@Engine/Managers/ControlsManager';
import { DeviceWatcher } from '@Engine/Watchers/DeviceWatcher';
import type { CameraParams } from '@Engine/Wrappers/CameraWrapper';
import type { ActorParams } from '@Engine/Wrappers/ActorWrapper';
import { isNotDefined } from '@Engine/Utils';
import { RendererManager } from '@Engine/Managers/RendererManager';
import type { OrthographicCamera } from 'three/src/cameras/OrthographicCamera';

const deviceWatcher = new DeviceWatcher({
  width: window.innerWidth,
  height: window.innerHeight,
  ratio: window.devicePixelRatio || 1
});

const actorManager = new ActorManager();
const cameraManager = new CameraManager();
const lightManager = new LightManager();
const controlsManager = new ControlsManager();
// const inputManager = new InputManager();
const loopManager = new LoopManager();
const sceneManager = new SceneManager();
const rendererManager = new RendererManager();

const scene = sceneManager.create('test_scene_1');
sceneManager.setCurrent(scene);

// sceneManager.attachTo(actorManager, scene);
// sceneManager.attachTo(cameraManager, scene);
// sceneManager.attachTo(lightManager, scene);
// sceneManager.attachTo(inputManager, scene);

const planeParams: ActorParams = {
  width: 60,
  height: 40,
  widthSegments: 10,
  heightSegments: 10,
  materialParams: { color: new Color('#5EDCAE') },
  type: 'plane'
};
//test
const planeActor = actorManager.create(planeParams);

// const sphereParams: ActorParams = {
//   width: 1,
//   height: 32,
//   heightSegments: 32,
//   materialParams: { color: new Color('#E91E63') },
//   type: 'sphere'
// };
//
// const sphereActor = actorManager.create(sphereParams);

const params: CameraParams = {
  width: deviceWatcher.size$.value.width,
  height: deviceWatcher.size$.value.height,
  fov: 45,
  near: 1,
  far: 10000
};
const wrappedCamera = cameraManager.create(params, deviceWatcher);
cameraManager.setCurrent(wrappedCamera);
wrappedCamera.setPosition(3, 20, 35);
wrappedCamera.lookAt(0, 0, 0);

deviceWatcher.start();

if (isNotDefined(cameraManager.current$.value)) throw new Error('Camera is not ready');

const canvas: HTMLElement | null = document.querySelector('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');

const renderer = rendererManager.create(canvas, deviceWatcher);
rendererManager.setCurrent(renderer);
if (isNotDefined(rendererManager.current$.value)) throw new Error('Renderer is not ready');
const controls = controlsManager.create(cameraManager.current$.value, rendererManager.current$.value);
controlsManager.setCurrent(controls);

const ambientLight = lightManager.create({ type: 'ambient', color: 0xffffff, intensity: 0.5 });
const wrappedDirectionalLight = lightManager.create({
  type: 'directional',
  color: '#ffffff',
  intensity: 1
});
// eslint-disable-next-line functional/immutable-data
wrappedDirectionalLight.entity.castShadow = true;
wrappedDirectionalLight.entity.shadow.mapSize.set(1024, 1024);
// eslint-disable-next-line functional/immutable-data
(wrappedDirectionalLight.entity.shadow.camera as OrthographicCamera).far = 15;
// eslint-disable-next-line functional/immutable-data
wrappedDirectionalLight.entity.shadow.normalBias = 0.05;
wrappedDirectionalLight.entity.position.set(0.25, 2, 2.25);

// inputManager.initMousePointer().addIntersectionPointer().onClick(onMouseClick);

if (isNotDefined(sceneManager.current$.value)) throw new Error('Current scene is not set');
// sceneManager.current$.value.entity.add(sphereActor.entity);
sceneManager.current$.value.entity.add(planeActor.entity);
sceneManager.current$.value.entity.add(wrappedCamera.entity);
sceneManager.current$.value.entity.add(ambientLight.entity);
sceneManager.current$.value.entity.add(wrappedDirectionalLight.entity);

const loop = loopManager.create();
loopManager.setCurrent(loop);
loopManager.start(renderer, scene, wrappedCamera);

//This is how to stop the loop
// setTimeout(() => loopManager.stop(), 3000);

// TODO (S.Panfilov) move it to any other place
// function onMouseClick({ x, y, z }: Vector3, event: MouseEvent): void {
//   event.preventDefault();
//   const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshToonMaterial({ color: new Color('#5EDCAE') }));
//   sphere.position.set(x, y, z);
//   sphere.castShadow = true;
//   scene.add(sphere);
// }
