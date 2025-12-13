import type { ActorConfig, CameraConfig, LightConfig, SceneConfig } from '@Engine/Launcher/Models';
import type {
  ActorParams,
  CameraParams,
  Factory,
  LightParams,
  Registry,
  RendererParams,
  SceneParams
} from '@Engine/Models';
import { ActorFactory, CameraFactory, LightFactory, RendererFactory, SceneFactory } from '@Engine/Factories';
import { actorAdapter, lightAdapter } from '@Engine/Launcher/ConfigToParamAdapters';
import { ActorRegistry, CameraRegistry, LightRegistry } from '@Engine/Registries';
import { createDeferredPromise, isNotDefined } from '@Engine/Utils';
import type { IActorWrapper, ICameraWrapper, ILightWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';
import { combineLatest } from 'rxjs';

export async function launch(sceneConfig: SceneConfig): Promise<void> {
  const { name, actors, cameras, lights } = sceneConfig;
  const { promise, resolve } = createDeferredPromise<void>();

  // TODO (S.Panfilov) CWP
  // make actor config a part of actor params (do same for camera and light)
  // then the actor should watch if he was added to the scene,ZZ
  // then apply position (or maybe it's not necessary, an we could apply values immediately
  // check if the adding to a scene must go before setting position and etc

  //Factories
  const sceneFactory: Factory<ISceneWrapper, SceneParams> = SceneFactory();
  const actorFactory: Factory<IActorWrapper, ActorParams> = ActorFactory();
  const cameraFactory: Factory<ICameraWrapper, CameraParams> = CameraFactory();
  const lightFactory: Factory<ILightWrapper, LightParams> = LightFactory();
  const rendererFactory: Factory<IRendererWrapper, RendererParams> = RendererFactory();

  //Entities registries
  const actorRegistry: Registry<IActorWrapper> = ActorRegistry();
  const cameraRegistry: Registry<ICameraWrapper> = CameraRegistry();
  const lightRegistry: Registry<ILightWrapper> = LightRegistry();

  //Subscriptions
  combineLatest([actorFactory.latest$, sceneFactory.latest$]).subscribe(([actor, scene]) => {
    if (isNotDefined(scene) || isNotDefined(actor)) return;
    actorRegistry.add$.next(actor);
    scene.addActor$.next(actor);
  });

  combineLatest([cameraFactory.latest$, sceneFactory.latest$]).subscribe(([camera, scene]) => {
    if (isNotDefined(scene) || isNotDefined(camera)) return;
    cameraRegistry.add$.next(camera);
    scene.addCamera$.next(camera);
  });

  combineLatest([lightFactory.latest$, sceneFactory.latest$]).subscribe(([light, scene]) => {
    if (isNotDefined(scene) || isNotDefined(light)) return;
    lightRegistry.add$.next(light);
    scene.addLight$.next(light);
  });

  //Dynamic create entities
  sceneFactory.add$.next({ name });
  actors.forEach((config: ActorConfig) => actorFactory.add$.next(actorAdapter(config)));
  cameras.forEach((config: CameraConfig) => cameraFactory.add$.next(config.params));
  lights.forEach((config: LightConfig) => lightFactory.add$.next(lightAdapter(config)));

  // TODO (S.Panfilov) canvas (or something else) should come from settings
  const canvas: HTMLElement | null = document.querySelector('#app');
  if (isNotDefined(canvas)) throw new Error('Canvas is not defined');

  rendererFactory.add$.next({ canvas });

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
