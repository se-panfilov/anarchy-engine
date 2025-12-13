import type { IAppCanvas } from '@Engine/Domains/App';
import type { ICameraConfig, ICameraFactory, ICameraRegistry, ICameraWrapper } from '@Engine/Domains/Camera';
import { CameraFactory, CameraRegistry, CameraTag } from '@Engine/Domains/Camera';
import type { ILoopFactory, ILoopRegistry, ILoopWrapper } from '@Engine/Domains/Loop';
import { LoopFactory, LoopRegistry, LoopTag } from '@Engine/Domains/Loop';
import type { IRendererFactory, IRendererRegistry, IRendererWrapper } from '@Engine/Domains/Renderer';
import { RendererFactory, RendererRegistry, RendererTag } from '@Engine/Domains/Renderer';
import type { ISceneConfig, ISceneWrapper } from '@Engine/Domains/Scene';
import { SceneFactory } from '@Engine/Domains/Scene';
import type { IBuiltGame } from '@Engine/Launcher';
import { isNotDefined, isValidSceneConfig } from '@Engine/Utils';
import { BehaviorSubject } from 'rxjs';

import type { IActorConfig, IActorFactory, IActorRegistry, IActorWrapper } from '@/Engine/Domains/Actor';
import { ActorFactory, ActorRegistry } from '@/Engine/Domains/Actor';
import type { IControlsConfig, IControlsFactory, IControlsRegistry, IControlsWrapper } from '@/Engine/Domains/Controls';
import { ControlsFactory, ControlsRegistry } from '@/Engine/Domains/Controls';
import type { ILightConfig, ILightFactory, ILightRegistry, ILightWrapper } from '@/Engine/Domains/Light';
import { LightFactory, LightRegistry } from '@/Engine/Domains/Light';

// TODO (S.Panfilov) fix IBuiltGame type
// TODO (S.Panfilov) CWP All factories should be self-registrable
// TODO (S.Panfilov) Registries should kill all registred instances

export function buildGame(sceneConfig: ISceneConfig, canvas: IAppCanvas): IBuiltGame {
  const built$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  if (!isValidSceneConfig(sceneConfig)) throw new Error('Failed to launch a scene: invalid data format');
  const { name: sceneName, actors, cameras, lights, controls, tags } = sceneConfig;

  const scene: ISceneWrapper = SceneFactory().create({ name: sceneName, tags });

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
    built$.complete();

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

  built$.next(true);

  function destroy(): void {
    destroyed$.next(true);
  }

  return {
    destroy,
    start(): ILoopWrapper {
      loop.start(renderer, scene, initialCamera);
      return loop;
    },
    built$,
    destroyed$,
    actors: {
      factory: { initial: actorFactory },
      registry: { initial: actorRegistry }
    },
    cameras: {
      factory: { initial: cameraFactory },
      registry: { initial: cameraRegistry }
    },
    lights: {
      factory: { initial: lightFactory },
      registry: { initial: lightRegistry }
    },
    controls: {
      factory: { initial: controlsFactory },
      registry: { initial: controlsRegistry }
    },
    loops: {
      factory: { initial: loopFactory },
      registry: { initial: loopRegistry }
    },
    renderers: {
      factory: { initial: rendererFactory },
      registry: { initial: rendererRegistry }
    }
  };
}
