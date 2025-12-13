import type { IAppCanvas } from '@Engine/Domains/App';
import type { ICameraConfig, ICameraFactory, ICameraRegistry, ICameraWrapper } from '@Engine/Domains/Camera';
import { CameraFactory, CameraRegistry, CameraTag } from '@Engine/Domains/Camera';
import type { ILoopFactory, ILoopWrapper } from '@Engine/Domains/Loop';
import { LoopFactory, LoopTag } from '@Engine/Domains/Loop';
import type { IRendererFactory, IRendererWrapper } from '@Engine/Domains/Renderer';
import { RendererFactory, RendererTag } from '@Engine/Domains/Renderer';
import type { ISceneConfig, ISceneWrapper } from '@Engine/Domains/Scene';
import { SceneFactory } from '@Engine/Domains/Scene';
import type { ILaunchedScene, ISceneLauncher } from '@Engine/Launcher';
import { isNotDefined, isValidSceneConfig } from '@Engine/Utils';
import { BehaviorSubject } from 'rxjs';

import type { IActorConfig, IActorFactory, IActorRegistry, IActorWrapper } from '@/Engine/Domains/Actor';
import { ActorFactory, ActorRegistry } from '@/Engine/Domains/Actor';
import type { IControlsConfig, IControlsFactory, IControlsRegistry, IControlsWrapper } from '@/Engine/Domains/Controls';
import { ControlsFactory, ControlsRegistry } from '@/Engine/Domains/Controls';
import type { ILightConfig, ILightFactory, ILightRegistry, ILightWrapper } from '@/Engine/Domains/Light';
import { LightFactory, LightRegistry } from '@/Engine/Domains/Light';

// TODO (S.Panfilov) CWP All factories (especially wrapper's) don't care about entity registration, but they should
// Registries should be created automatically and dynamically added to pools

export function SceneLauncher(): ISceneLauncher {
  const launched$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  let scene: ISceneWrapper;

  // TODO (S.Panfilov) CWP implement new scene launcher
  function buildScene(sceneConfig: ISceneConfig, canvas: IAppCanvas): ILaunchedScene {
    if (!isValidSceneConfig(sceneConfig)) throw new Error('Failed to launch a scene: invalid data format');
    const { name: sceneName, actors, cameras, lights, controls, tags } = sceneConfig;

    // TODO (S.Panfilov) launch() should be a method of a scene, extract this outside
    scene = SceneFactory().create({ name: sceneName, tags });

    // TODO (S.Panfilov) refactor this maybe with command/strategy pattern?
    const actorFactory: IActorFactory = ActorFactory();
    const actorRegistry: IActorRegistry = ActorRegistry();
    actorFactory.entityCreated$.subscribe((instance: IActorWrapper): void => actorRegistry.add(instance));
    actors.forEach((actor: IActorConfig): IActorWrapper => actorFactory.create(actorFactory.getParams(actor)));

    const cameraFactory: ICameraFactory = CameraFactory();
    const cameraRegistry: ICameraRegistry = CameraRegistry();
    cameraFactory.entityCreated$.subscribe((instance: ICameraWrapper): void => cameraRegistry.add(instance));
    cameras.forEach((camera: ICameraConfig): ICameraWrapper => cameraFactory.create(cameraFactory.getParams(camera)));

    const lightFactory: ILightFactory = LightFactory();
    const lightRegistry: ILightRegistry = LightRegistry();
    lightFactory.entityCreated$.subscribe((instance: ILightWrapper): void => lightRegistry.add(instance));
    lights.forEach((light: ILightConfig): ILightWrapper => lightFactory.create(lightFactory.getParams(light)));

    const controlsFactory: IControlsFactory = ControlsFactory();
    const controlsRegistry: IControlsRegistry = ControlsRegistry();
    controlsFactory.entityCreated$.subscribe((instance: IControlsWrapper): void => controlsRegistry.add(instance));
    controls.forEach((control: IControlsConfig): IControlsWrapper => controlsFactory.create(controlsFactory.getParams(control)));

    const rendererFactory: IRendererFactory = RendererFactory();
    const rendererRegistry: IRendererRegistry = RendererRegistry();
    rendererFactory.entityCreated$.subscribe((instance: IRendererWrapper): void => rendererRegistry.add(instance));
    const renderer: IRendererWrapper = rendererFactory.create({ canvas, tags: [RendererTag.Main] });

    const loopFactory: ILoopFactory = LoopFactory();
    const loopRegistry: ILoopRegistry = LoopRegistry();
    loopFactory.entityCreated$.subscribe((instance: ILoopWrapper): void => loopRegistry.add(instance));
    const loop: ILoopWrapper = loopFactory.create({ tags: [LoopTag.Main] });

    destroyed$.subscribe(() => {
      launched$.complete();

      actorFactory.entityCreated$.unsubscribe();
      actorFactory.destroy();
      actorRegistry.destroy();

      cameraFactory.entityCreated$.unsubscribe();
      cameraFactory.destroy();
      cameraRegistry.destroy();

      lightFactory.entityCreated$.unsubscribe();
      lightFactory.destroy();
      lightRegistry.destroy();

      controlsFactory.entityCreated$.unsubscribe();
      controlsFactory.destroy();
      controlsRegistry.destroy();

      loopFactory.entityCreated$.unsubscribe();
      loopFactory.destroy();
      loopRegistry.destroy();

      rendererFactory.entityCreated$.unsubscribe();
      rendererFactory.destroy();
      rendererRegistry.destroy();

      destroyed$.unsubscribe();
      destroyed$.complete();
    });

    const initialCamera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(CameraTag.Initial);
    if (isNotDefined(initialCamera)) throw new Error(`Cannot start the main loop for the scene ${sceneName}: initial camera is not defined`);
    // TODO (S.Panfilov) should be extracted build() -> launch()
    loop.start(renderer, scene, initialCamera);

    launched$.next(true);

    function destroy(): void {
      destroyed$.next(true);
    }

    return {
      destroy,
      launched$,
      destroyed$,
      actors: {
        factory: [actorFactory],
        registry: [actorRegistry]
      },
      cameras: {
        factory: [cameraFactory],
        registry: [cameraRegistry]
      },
      lights: {
        factory: [lightFactory],
        registry: [lightRegistry]
      },
      controls: {
        factory: [controlsFactory],
        registry: [controlsRegistry]
      },
      loops: {
        factory: [loopFactory],
        registry: [loopRegistry]
      },
      renderers: {
        factory: [rendererFactory],
        registry: [rendererRegistry]
      }
    };
  }
}
