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
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { ambientContext } from '@/Engine/Context';
import { CommonTag } from '@/Engine/Domains/Abstract';
import type { IActorConfig, IActorFactory, IActorRegistry, IActorWrapper } from '@/Engine/Domains/Actor';
import { ActorFactory, ActorRegistry, ActorTag } from '@/Engine/Domains/Actor';
import type { IControlsConfig, IControlsFactory, IControlsRegistry, IOrbitControlsWrapper } from '@/Engine/Domains/Controls';
import { ControlsFactory, ControlsRegistry } from '@/Engine/Domains/Controls';
import type { IIntersectionsWatcher, IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Domains/Intersections';
import { IntersectionsWatcherFactory, IntersectionsWatcherRegistry } from '@/Engine/Domains/Intersections';
import type { ILightConfig, ILightFactory, ILightRegistry, ILightWrapper } from '@/Engine/Domains/Light';
import { LightFactory, LightRegistry } from '@/Engine/Domains/Light';

import type { ILevel, ILevelConfig } from '../Models';

// TODO (S.Panfilov) CWP All factories should be self-registrable (maybe pass a registry as a param there?)
// TODO (S.Panfilov) Registries' destroy() should kill all registered instances

// TODO (S.Panfilov) CWP 2. maybe add relations to all wrappers during the level build?

export function buildLevelFromConfig(canvas: IAppCanvas, config: ILevelConfig): ILevel {
  const built$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  if (!isValidLevelConfig(config)) throw new Error('Failed to launch a level: invalid data format');
  const { name, actors, cameras, lights, controls, scenes, tags } = config;

  // TODO (S.Panfilov) refactor this maybe with command/strategy pattern?
  const sceneFactory: ISceneFactory = SceneFactory();
  const sceneRegistry: ISceneRegistry = SceneRegistry();
  const sceneEntityCreatedSubscription: Subscription = sceneFactory.entityCreated$.subscribe((scene: ISceneWrapper): void => sceneRegistry.add(scene));
  scenes.forEach((scene: ISceneConfig): ISceneWrapper => sceneFactory.create(sceneFactory.getParams({ ...scene, tags: [...scene.tags, CommonTag.FromConfig] })));

  const scene: ISceneWrapper | undefined = sceneRegistry.getUniqByTag(SceneTag.Current);
  if (isNotDefined(scene)) throw new Error(`Cannot find the current scene for level "${name}" during the level building.`);

  const actorFactory: IActorFactory = ActorFactory();
  const actorRegistry: IActorRegistry = ActorRegistry();
  const actorAddedSubscription: Subscription = actorRegistry.added$.subscribe((actor: IActorWrapper) => scene.addActor(actor));
  const actorEntityCreatedSubscription: Subscription = actorFactory.entityCreated$.subscribe((actor: IActorWrapper): void => actorRegistry.add(actor));
  actors.forEach((actor: IActorConfig): IActorWrapper => actorFactory.create(actorFactory.getParams({ ...actor, tags: [...actor.tags, CommonTag.FromConfig] })));

  const cameraFactory: ICameraFactory = CameraFactory();
  const cameraRegistry: ICameraRegistry = CameraRegistry();
  const cameraAddedSubscription: Subscription = cameraRegistry.added$.subscribe((camera: ICameraWrapper) => scene.addCamera(camera));
  const cameraEntityCreatedSubscription: Subscription = cameraFactory.entityCreated$.subscribe((camera: ICameraWrapper): void => cameraRegistry.add(camera));
  cameras.forEach((camera: ICameraConfig): ICameraWrapper => cameraFactory.create(cameraFactory.getParams({ ...camera, tags: [...camera.tags, CommonTag.FromConfig] })));

  const controlsFactory: IControlsFactory = ControlsFactory();
  const controlsRegistry: IControlsRegistry = ControlsRegistry();
  const controlsEntityCreatedSubscription: Subscription = controlsFactory.entityCreated$.subscribe((controls: IOrbitControlsWrapper): void => controlsRegistry.add(controls));
  controls.forEach(
    (control: IControlsConfig): IOrbitControlsWrapper => controlsFactory.create(controlsFactory.getParams({ ...control, tags: [...control.tags, CommonTag.FromConfig] }, { cameraRegistry, canvas }))
  );

  const clickableActors: ReadonlyArray<IActorWrapper> = actorRegistry.getAllWithEveryTag([ActorTag.Intersectable]);
  const camera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(CameraTag.Initial);
  if (isNotDefined(camera)) throw new Error(`Cannot init intersection service: camera with tag "${CameraTag.Initial}" is not defined`);

  const intersectionsWatcherFactory: IIntersectionsWatcherFactory = IntersectionsWatcherFactory();
  const intersectionsWatcherRegistry: IIntersectionsWatcherRegistry = IntersectionsWatcherRegistry();
  const intersectionsWatcherEntityCreatedSubscription: Subscription = intersectionsWatcherFactory.entityCreated$.subscribe((intersectionsWatcher: IIntersectionsWatcher): void =>
    intersectionsWatcherRegistry.add({ ...intersectionsWatcher, tags: [...intersectionsWatcher.tags, CommonTag.FromConfig] })
  );
  const intersectionsWatcher: IIntersectionsWatcher = intersectionsWatcherFactory.create({ actors: clickableActors, camera, positionWatcher: ambientContext.mousePositionWatcher });

  const lightFactory: ILightFactory = LightFactory();
  const lightRegistry: ILightRegistry = LightRegistry();
  const lightAddedSubscription: Subscription = lightRegistry.added$.subscribe((light: ILightWrapper) => scene.addLight(light));
  const lightEntityCreatedSubscription: Subscription = lightFactory.entityCreated$.subscribe((light: ILightWrapper): void => lightRegistry.add(light));
  lights.forEach((light: ILightConfig): ILightWrapper => lightFactory.create(lightFactory.getParams({ ...light, tags: [...light.tags, CommonTag.FromConfig] })));

  const rendererFactory: IRendererFactory = RendererFactory();
  const rendererRegistry: IRendererRegistry = RendererRegistry();
  const rendererEntityCreatedSubscription: Subscription = rendererFactory.entityCreated$.subscribe((renderer: IRendererWrapper): void => rendererRegistry.add(renderer));
  const renderer: IRendererWrapper = rendererFactory.create({ canvas, tags: [RendererTag.Main], mode: RendererModes.WebGL2 });

  const loopFactory: ILoopFactory = LoopFactory();
  const loopRegistry: ILoopRegistry = LoopRegistry();
  const loopEntityCreatedSubscription: Subscription = loopFactory.entityCreated$.subscribe((loop: ILoopWrapper): void => loopRegistry.add(loop));
  const loop: ILoopWrapper = loopFactory.create({ tags: [LoopTag.Main, CommonTag.FromConfig] });

  destroyed$.subscribe(() => {
    built$.complete();

    sceneEntityCreatedSubscription.unsubscribe();

    actorEntityCreatedSubscription.unsubscribe();
    actorFactory.destroy();
    actorAddedSubscription.unsubscribe();
    actorRegistry.destroy();

    cameraEntityCreatedSubscription.unsubscribe();
    cameraFactory.destroy();
    cameraAddedSubscription.unsubscribe();
    cameraRegistry.destroy();

    lightEntityCreatedSubscription.unsubscribe();
    lightFactory.destroy();
    lightAddedSubscription.unsubscribe();
    lightRegistry.destroy();

    controlsEntityCreatedSubscription.unsubscribe();
    controlsFactory.destroy();
    controlsRegistry.destroy();

    intersectionsWatcherEntityCreatedSubscription.unsubscribe();
    intersectionsWatcherFactory.destroy();
    intersectionsWatcherRegistry.destroy();

    loopEntityCreatedSubscription.unsubscribe();
    loopFactory.destroy();
    loopRegistry.destroy();

    rendererEntityCreatedSubscription.unsubscribe();
    rendererFactory.destroy();
    rendererRegistry.destroy();

    destroyed$.complete();
  });

  const initialCamera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(CameraTag.Initial);
  if (isNotDefined(initialCamera)) throw new Error(`Cannot start the main loop for the level "${name}": initial camera is not defined`);

  built$.next(true);

  function destroy(): void {
    destroyed$.next(true);
  }

  return {
    name,
    start(): ILoopWrapper {
      intersectionsWatcher.start();
      loop.start(renderer, scene, initialCamera, controlsRegistry);
      return loop;
    },
    stop(): void {
      intersectionsWatcher.stop();
      // TODO (S.Panfilov) implement stop
      // loop.stop(renderer, scene, initialCamera, controlsRegistry);
    },
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
    intersectionsWatcher: {
      factory: { initial: intersectionsWatcherFactory },
      registry: { initial: intersectionsWatcherRegistry }
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
    tags,
    get built$(): Observable<boolean> {
      return built$.asObservable();
    },
    isBuilt: (): boolean => built$.getValue(),
    destroy,
    get destroyed$(): Observable<boolean> {
      return destroyed$.asObservable();
    },
    isDestroyed: (): boolean => destroyed$.getValue()
  };
}
