import './style.css';
import { Color, Mesh, MeshToonMaterial, SphereGeometry, Vector3 } from 'three';
import { SceneManager } from '@Engine/Managers/SceneManager';
import { LoopManager } from '@Engine/Managers/LoopManager';
import { CameraManager } from '@Engine/Managers/CameraManager';
import { LightManager } from '@Engine/Managers/LightManager';
import { InputManager } from '@Engine/Managers/InputManager';
import { ActorManager } from '@Engine/Managers/ActorManager';
import { ControlManager } from '@Engine/Managers/ControlManager';

const actorManager = ActorManager();
const cameraManager = CameraManager();
const lightManager = LightManager();
const controlManager = ControlManager();
const inputManager = InputManager();
const loopManager = LoopManager();
const sceneManager = SceneManager();

const scene = sceneManager.create();
sceneManager.setCurrent(scene);

// sceneManager.attachManagerToScene(actorManager, scene);
// sceneManager.attachManagerToScene(cameraManager, scene);
// sceneManager.attachManagerToScene(lightManager, scene);
// sceneManager.attachManagerToScene(inputManager, scene);

actorManager.create('sphere');
actorManager.create('plane');

const wrappedCamera = cameraManager.create();
cameraManager.setCurrent(wrappedCamera);
wrappedCamera.setPosition(3, 2, 15);
wrappedCamera.lookAt(0, 0, 0);

const wrappedControl = controlManager.create();
wrappedControl.control.wrappedCamera.setControls('OrbitControls');

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
