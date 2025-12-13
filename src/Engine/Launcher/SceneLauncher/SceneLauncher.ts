import type { IAppCanvas } from '@Engine/Domains/App';
import type { ICameraConfig, ICameraFactory, ICameraParams, ICameraRegistry, ICameraWrapper } from '@Engine/Domains/Camera';
import { CameraFactory, CameraRegistry, CameraTag } from '@Engine/Domains/Camera';
import type { ILoopWrapper } from '@Engine/Domains/Loop';
import { LoopFactory, LoopTag } from '@Engine/Domains/Loop';
import type { IRendererWrapper } from '@Engine/Domains/Renderer';
import { RendererFactory, RendererTag } from '@Engine/Domains/Renderer';
import type { ISceneConfig, ISceneWrapper } from '@Engine/Domains/Scene';
import { SceneFactory } from '@Engine/Domains/Scene';
import type { ILaunchedScene, ISceneLauncher } from '@Engine/Launcher';
import { isNotDefined, isValidSceneConfig } from '@Engine/Utils';
import { BehaviorSubject } from 'rxjs';

import type { IActorConfig, IActorFactory, IActorParams, IActorRegistry, IActorWrapper } from '@/Engine/Domains/Actor';
import { ActorFactory, ActorRegistry } from '@/Engine/Domains/Actor';
import type { IControlsConfig, IControlsFactory, IControlsParams, IControlsRegistry, IControlsWrapper } from '@/Engine/Domains/Controls';
import { ControlsFactory, ControlsRegistry } from '@/Engine/Domains/Controls';
import type { ILightConfig, ILightFactory, ILightParams, ILightRegistry, ILightWrapper } from '@/Engine/Domains/Light';
import { LightFactory, LightRegistry } from '@/Engine/Domains/Light';

// TODO (S.Panfilov) CWP All factories (especially wrapper's) don't care about entity registration, but they should
// Registries should be created automatically and dynamically added to pools

export function SceneLauncher(): ISceneLauncher {
  const launched$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  let scene: ISceneWrapper;

  // TODO (S.Panfilov) CWP implement new scene launcher
  function launch(sceneConfig: ISceneConfig, canvas: IAppCanvas): ILaunchedScene {
    if (!isValidSceneConfig(sceneConfig)) throw new Error('Failed to launch a scene: invalid data format');
    const { name: sceneName, actors, cameras, lights, controls, tags } = sceneConfig;

    // TODO (S.Panfilov) launch() should be a method of a scene, extract this outside
    scene = SceneFactory().create({ name: sceneName, tags });

    const actorFactory: IActorFactory = ActorFactory();
    const actorRegistry: IActorRegistry = ActorRegistry();
    // TODO (S.Panfilov) rewrite with subscribe registry to factory.created?
    actors.forEach((actor: IActorConfig): void => {
      const params: IActorParams = actorFactory.getParams(actor);
      const instance: IActorWrapper = actorFactory.create(params);
      actorRegistry.add(instance);
    });

    const cameraFactory: ICameraFactory = CameraFactory();
    const cameraRegistry: ICameraRegistry = CameraRegistry();
    cameras.forEach((camera: ICameraConfig): void => {
      const params: ICameraParams = cameraFactory.getParams(camera);
      const instance: ICameraWrapper = cameraFactory.create(params);
      cameraRegistry.add(instance);
    });

    const lightFactory: ILightFactory = LightFactory();
    const lightRegistry: ILightRegistry = LightRegistry();
    lights.forEach((light: ILightConfig): void => {
      const params: ILightParams = lightFactory.getParams(light);
      const instance: ILightWrapper = lightFactory.create(params);
      lightRegistry.add(instance);
    });

    const controlsFactory: IControlsFactory = ControlsFactory();
    const controlsRegistry: IControlsRegistry = ControlsRegistry();
    controls.forEach((control: IControlsConfig): void => {
      const params: IControlsParams = controlsFactory.getParams(control);
      const instance: IControlsWrapper = controlsFactory.create(params);
      controlsRegistry.add(instance);
    });

    const renderer: IRendererWrapper = RendererFactory().create({ canvas, tags: [RendererTag.Main] });

    const loop: ILoopWrapper = LoopFactory().create({ tags: [LoopTag.Main] });

    destroyed$.subscribe(() => {
      launched$.complete();

      actorFactory.destroy();
      actorRegistry.destroy();

      cameraFactory.destroy();
      cameraRegistry.destroy();

      lightFactory.destroy();
      lightRegistry.destroy();

      controlsFactory.destroy();
      controlsRegistry.destroy();

      loop.destroy();
      renderer.destroy();
      scene.destroy();

      destroyed$.unsubscribe();
      destroyed$.complete();
    });

    const initialCamera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(CameraTag.Initial);
    if (isNotDefined(initialCamera)) throw new Error(`Cannot start the main loop for the scene ${sceneName}: initial camera is not defined`);
    loop.start(renderer, scene, initialCamera);

    launched$.next(true);
    return { loop, renderer };
  }

  function destroy(): void {
    destroyed$.next(true);
  }

  return { prepare, launch, destroy, prepared$, launched$, destroyed$ };
}
