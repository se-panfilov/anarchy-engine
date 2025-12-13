import './style.css';
import { Color, Mesh, MeshToonMaterial, SphereGeometry, Vector3 } from 'three';

const actorManager = new ActorManager();
const cameraManager = new CameraManager();
const lightManager = new LightManager();
const inputManager = new InputManager();
const loopManager = new LoopManager();
const sceneManager = new SceneManager();

const scene = sceneManager.createScene();
sceneManager.setCurrentScene(scene);

sceneManager.currentScene.attachActorManager(actorManager);
sceneManager.currentScene.attachCameraManager(cameraManager);
sceneManager.currentScene.attachLightManager(lightManager);
sceneManager.currentScene.attachInputManager(inputManager);

actorManager.addActor('sphere');
actorManager.addActor('plane');

cameraManager.createCamera().setAsCurrent().setPosition(3, 2, 15).lookAt(0, 0, 0).setControls('OrbitControls');

lightManager.addAmbientLight();
lightManager.addDirectionalLight();

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
