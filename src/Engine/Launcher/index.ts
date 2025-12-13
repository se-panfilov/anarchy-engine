import type { ActorConfig, CameraConfig, LightConfig, SceneConfig } from '@Engine/Launcher/Models';
import type {
  ActorParams,
  CameraParams,
  Factory,
  LightParams,
  LoopParams,
  Registry,
  RendererParams,
  SceneParams
} from '@Engine/Models';
import {
  ActorFactory,
  CameraFactory,
  LightFactory,
  LoopFactory,
  RendererFactory,
  SceneFactory
} from '@Engine/Factories';
import { ActorRegistry, CameraRegistry, LightRegistry } from '@Engine/Registries';
import { createDeferredPromise, isNotDefined } from '@Engine/Utils';
import type {
  IActorWrapper,
  ICameraWrapper,
  ILightWrapper,
  ILoopWrapper,
  IRendererWrapper,
  ISceneWrapper
} from '@Engine/Wrappers';
import { combineLatest } from 'rxjs';

export async function launch(sceneConfig: SceneConfig): Promise<void> {
  const { name, actors, cameras, lights } = sceneConfig;
  const { promise, resolve } = createDeferredPromise<void>();

  //Factories
  const sceneFactory: Factory<ISceneWrapper, SceneParams> = SceneFactory();
  const actorFactory: Factory<IActorWrapper, ActorParams> = ActorFactory();
  const cameraFactory: Factory<ICameraWrapper, CameraParams> = CameraFactory();
  const lightFactory: Factory<ILightWrapper, LightParams> = LightFactory();
  const rendererFactory: Factory<IRendererWrapper, RendererParams> = RendererFactory();
  const loopFactory: Factory<ILoopWrapper, LoopParams> = LoopFactory();

  //Entities registries
  const actorRegistry: Registry<IActorWrapper> = ActorRegistry();
  const cameraRegistry: Registry<ICameraWrapper> = CameraRegistry();
  const lightRegistry: Registry<ILightWrapper> = LightRegistry();

  //Subscriptions
  combineLatest([actorFactory.latest$, sceneFactory.latest$]).subscribe(
    ([actor, scene]: [IActorWrapper, ISceneWrapper]) => {
      if (isNotDefined(scene) || isNotDefined(actor)) return;
      actorRegistry.add$.next(actor);
      scene.addActor$.next(actor);
    }
  );

  combineLatest([cameraFactory.latest$, sceneFactory.latest$]).subscribe(
    ([camera, scene]: [ICameraWrapper, ISceneWrapper]) => {
      if (isNotDefined(scene) || isNotDefined(camera)) return;
      cameraRegistry.add$.next(camera);
      scene.addCamera$.next(camera);
    }
  );

  combineLatest([lightFactory.latest$, sceneFactory.latest$]).subscribe(
    ([light, scene]: [ILightWrapper, ISceneWrapper]) => {
      if (isNotDefined(scene) || isNotDefined(light)) return;
      lightRegistry.add$.next(light);
      scene.addLight$.next(light);
    }
  );

  // TODO (S.Panfilov) CWP
  // debug the scene to make sure no errors and it's fully rendering
  // and fix this loop
  combineLatest([loopFactory.latest$, rendererFactory.latest$, sceneFactory.latest$, cameraFactory.latest$]).subscribe(
    ([loop, renderer, scene, camera]: [ILoopWrapper, IRendererWrapper, ISceneWrapper, ICameraWrapper]) => {
      console.log('111');
      loop.start(renderer, scene, camera);
      console.log(loop);
    }
  );

  //Dynamic create entities
  sceneFactory.create$.next({ name });
  actors.forEach((config: ActorConfig) => actorFactory.createFromConfig$.next(config));
  cameras.forEach((config: CameraConfig) => cameraFactory.createFromConfig$.next(config));
  lights.forEach((config: LightConfig) => lightFactory.createFromConfig$.next(config));

  // TODO (S.Panfilov) canvas (or something else) should come from settings
  const canvas: HTMLElement | null = document.querySelector('#app');
  if (isNotDefined(canvas)) throw new Error('Canvas is not defined');

  rendererFactory.create$.next({ canvas });
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

  // TODO (S.Panfilov) any
  loopFactory.create$.next({} as any);
  ////////////////////////////////////

  resolve();

  return promise;
}
