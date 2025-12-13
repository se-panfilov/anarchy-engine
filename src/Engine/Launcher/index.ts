import type { ActorConfig, CameraConfig, LightConfig, SceneConfig } from '@Engine/Launcher/Models';
import type { ActorParams, LightParams } from '@Engine/Models';
import { ActorFactory, CameraFactory, LightFactory, RendererFactory, SceneFactory } from '@Engine/Factories';
import { createDeferredPromise, isNotDefined } from '@Engine/Utils';
import { actorAdapter, lightAdapter } from '@Engine/Launcher/ConfigToParamAdapters';
import { combineLatest } from 'rxjs';

export async function launch(sceneConfig: SceneConfig): Promise<void> {
  const { name, actors, cameras, lights } = sceneConfig;
  const { promise, resolve } = createDeferredPromise<void>();

  // create scene/////////////////////
  const sceneFactory = SceneFactory();
  sceneFactory.add$.next({ name });
  ////////////////////////////////////

  const actorFactory = ActorFactory();
  const cameraFactory = CameraFactory();
  const lightFactory = LightFactory();
  const rendererFactory = RendererFactory();

  combineLatest([actorFactory.latest$, sceneFactory.latest$]).subscribe(([actor, scene]) => {
    if (isNotDefined(scene) || isNotDefined(actor)) return;
    scene.addActor(actor);
  });

  // TODO (S.Panfilov) CWP
  // make actor config a part of actor params
  // actor should be added to registry on creation (new Map())
  // the he should watch if he was added to the scene,
  // then apply position (or maybe it's not necessary, an we could apply values immediatelly
  // check if the adding to a scene must go before setting position and etc

  combineLatest([cameraFactory.latest$, sceneFactory.latest$]).subscribe(([camera, scene]) => {
    if (isNotDefined(scene) || isNotDefined(camera)) return;
    scene.addCamera(camera);
  });

  combineLatest([lightFactory.latest$, sceneFactory.latest$]).subscribe(([light, scene]) => {
    if (isNotDefined(scene) || isNotDefined(light)) return;
    scene.addLight(light);
  });

  // create actors/////////////////////
  actors.forEach((config: ActorConfig) => {
    const params: ActorParams = actorAdapter(config);
    actorFactory.add$.next(params);
    // TODO (S.Panfilov) CWP we should set actor's position adn etc in a single place, avoid multiple subscriptions if possible
    // const actor: ActorWrapper = actorManager.create(params);
    actor.setPosition(config.position.x, config.position.y, config.position.z);
    actor.setCastShadow(config.castShadow);
  });
  ////////////////////////////////////

  // create camera/////////////////////

  cameras.forEach((config: CameraConfig) => {
    cameraFactory.add$.next(config.params);
    camera.lookAt(config.lookAt.x, config.lookAt.y, config.lookAt.z);
    camera.setPosition(config.position.x, config.position.y, config.position.z);
  });

  const canvas: HTMLElement | null = document.querySelector('#app');
  if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
  rendererFactory.add$.next(canvas);

  // //create lights/////////////////////
  lights.forEach((config: LightConfig) => {
    const params: LightParams = lightAdapter(config);
    lightFactory.add$.next(params);
  });
  // ////////////////////////////////////

  // create controls (needs camera, renderer)/////////////////////
  // TODO (S.Panfilov)
  ////////////////////////////////////

  // create mouse pointer/////////////////////
  // TODO (S.Panfilov)
  ////////////////////////////////////

  // create intersection pointer (mouse pointer, camera, scene)/////////////////////
  // TODO (S.Panfilov)
  ////////////////////////////////////

  // listen clicks by intersection pointer/////////////////////
  // TODO (S.Panfilov)
  ////////////////////////////////////

  // start loop (renderer, scene, camera)/////////////////////
  // TODO (S.Panfilov)
  ////////////////////////////////////

  resolve();

  return promise;
}
