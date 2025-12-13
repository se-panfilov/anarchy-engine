import type { IAppCanvas } from '@Engine/Domains/App';
import type { ICameraConfig, ICameraFactory, ICameraRegistry, ICameraWrapper } from '@Engine/Domains/Camera';
import { CameraFactory, CameraRegistry, CameraTag } from '@Engine/Domains/Camera';
import type { ILoopFactory, ILoopRegistry, ILoopWrapper } from '@Engine/Domains/Loop';
import { LoopFactory, LoopRegistry, LoopTag } from '@Engine/Domains/Loop';
import type { IRendererFactory, IRendererRegistry, IRendererWrapper } from '@Engine/Domains/Renderer';
import { RendererFactory, RendererModes, RendererRegistry, RendererTag } from '@Engine/Domains/Renderer';
import type { ISceneConfig, ISceneFactory, ISceneRegistry, ISceneWrapper } from '@Engine/Domains/Scene';
import { SceneFactory, SceneRegistry, SceneTag } from '@Engine/Domains/Scene';
import { isNotDefined, isValidLevelConfig } from '@Engine/Utils';
import { Subject } from 'rxjs';

import type { IActorConfig, IActorFactory, IActorRegistry, IActorWrapper } from '@/Engine/Domains/Actor';
import { ActorFactory, ActorRegistry } from '@/Engine/Domains/Actor';
import type { IControlsConfig, IControlsFactory, IControlsRegistry, IOrbitControlsWrapper } from '@/Engine/Domains/Controls';
import { ControlsFactory, ControlsRegistry } from '@/Engine/Domains/Controls';
import type { ILightConfig, ILightFactory, ILightRegistry, ILightWrapper } from '@/Engine/Domains/Light';
import { LightFactory, LightRegistry } from '@/Engine/Domains/Light';

import type { ILevel, ILevelConfig } from '../Models';

// TODO (S.Panfilov) CWP All factories should be self-registrable
// TODO (S.Panfilov) Registries' destroy() should kill all registered instances

// TODO (S.Panfilov) CWP 1. Add dumpling for every loop for every control
// TODO (S.Panfilov) CWP 2. Add relations to all wrappers during the level build

export function buildLevelFromConfig(canvas: IAppCanvas, config: ILevelConfig): ILevel {
  const built$: Subject<void> = new Subject<void>();
  const destroyed$: Subject<void> = new Subject<void>();
  let isDestroyed: boolean = false;

  if (!isValidLevelConfig(config)) throw new Error('Failed to launch a level: invalid data format');
  const { name, actors, cameras, lights, controls, scenes, tags } = config;

  // TODO (S.Panfilov) refactor this maybe with command/strategy pattern?
  const sceneFactory: ISceneFactory = SceneFactory();
  const sceneRegistry: ISceneRegistry = SceneRegistry();
  sceneFactory.entityCreated$.subscribe((instance: ISceneWrapper): void => sceneRegistry.add(instance));
  scenes.forEach((scene: ISceneConfig): ISceneWrapper => sceneFactory.create(sceneFactory.getParams(scene)));

  const scene: ISceneWrapper | undefined = sceneRegistry.getUniqByTag(SceneTag.Current);
  if (isNotDefined(scene)) throw new Error(`Cannot find the current scene for level "${name}" during the level building.`);

  const actorFactory: IActorFactory = ActorFactory();
  const actorRegistry: IActorRegistry = ActorRegistry();
  actorRegistry.added$.subscribe((actor: IActorWrapper) => scene.addActor(actor));
  actorFactory.entityCreated$.subscribe((instance: IActorWrapper): void => actorRegistry.add(instance));
  actors.forEach((actor: IActorConfig): IActorWrapper => actorFactory.create(actorFactory.getParams(actor)));

  const cameraFactory: ICameraFactory = CameraFactory();
  const cameraRegistry: ICameraRegistry = CameraRegistry();
  cameraRegistry.added$.subscribe((camera: ICameraWrapper) => scene.addCamera(camera));
  cameraFactory.entityCreated$.subscribe((instance: ICameraWrapper): void => cameraRegistry.add(instance));
  cameras.forEach((camera: ICameraConfig): ICameraWrapper => cameraFactory.create(cameraFactory.getParams(camera)));

  const controlsFactory: IControlsFactory = ControlsFactory();
  const controlsRegistry: IControlsRegistry = ControlsRegistry();
  controlsFactory.entityCreated$.subscribe((instance: IOrbitControlsWrapper): void => controlsRegistry.add(instance));
  controls.forEach((control: IControlsConfig): IOrbitControlsWrapper => controlsFactory.create(controlsFactory.getParams(control, { cameraRegistry, canvas })));

  const lightFactory: ILightFactory = LightFactory();
  const lightRegistry: ILightRegistry = LightRegistry();
  lightRegistry.added$.subscribe((light: ILightWrapper) => scene.addLight(light));
  lightFactory.entityCreated$.subscribe((instance: ILightWrapper): void => lightRegistry.add(instance));
  lights.forEach((light: ILightConfig): ILightWrapper => lightFactory.create(lightFactory.getParams(light)));

  const rendererFactory: IRendererFactory = RendererFactory();
  const rendererRegistry: IRendererRegistry = RendererRegistry();
  rendererFactory.entityCreated$.subscribe((instance: IRendererWrapper): void => rendererRegistry.add(instance));
  const renderer: IRendererWrapper = rendererFactory.create({ canvas, tags: [RendererTag.Main], mode: RendererModes.WebGL2 });

  const loopFactory: ILoopFactory = LoopFactory();
  const loopRegistry: ILoopRegistry = LoopRegistry();
  loopFactory.entityCreated$.subscribe((instance: ILoopWrapper): void => loopRegistry.add(instance));
  const loop: ILoopWrapper = loopFactory.create({ tags: [LoopTag.Main] });

  destroyed$.subscribe(() => {
    isDestroyed = true;
    built$.complete();

    actorFactory.entityCreated$.unsubscribe();
    actorFactory.destroy();
    actorRegistry.added$.unsubscribe();
    actorRegistry.destroy();

    cameraFactory.entityCreated$.unsubscribe();
    cameraFactory.destroy();
    cameraRegistry.added$.unsubscribe();
    cameraRegistry.destroy();

    lightFactory.entityCreated$.unsubscribe();
    lightFactory.destroy();
    lightRegistry.added$.unsubscribe();
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
  if (isNotDefined(initialCamera)) throw new Error(`Cannot start the main loop for the level "${name}": initial camera is not defined`);

  built$.next();

  function destroy(): void {
    destroyed$.next();
  }

  return {
    name,
    destroy,
    isDestroyed,
    start(): ILoopWrapper {
      loop.start(renderer, scene, initialCamera);
      return loop;
    },
    built$,
    destroyed$,
    actor: {
      factory: { initial: actorFactory },
      registry: { initial: actorRegistry }
    },
    camera: {
      factory: { initial: cameraFactory },
      registry: { initial: cameraRegistry }
    },
    light: {
      factory: { initial: lightFactory },
      registry: { initial: lightRegistry }
    },
    controls: {
      factory: { initial: controlsFactory },
      registry: { initial: controlsRegistry }
    },
    loop: {
      factory: { initial: loopFactory },
      registry: { initial: loopRegistry }
    },
    scenes: {
      factory: { initial: sceneFactory },
      registry: { initial: sceneRegistry }
    },
    renderer: {
      factory: { initial: rendererFactory },
      registry: { initial: rendererRegistry }
    },
    tags
  };
}
