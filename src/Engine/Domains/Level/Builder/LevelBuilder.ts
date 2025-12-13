import type { Subscription } from 'rxjs';

import { ambientContext } from '@/Engine/Context';
import { CommonTag } from '@/Engine/Domains/Abstract';
import type { IActorConfig, IActorFactory, IActorRegistry, IActorWrapper } from '@/Engine/Domains/Actor';
import { ActorFactory, ActorRegistry, ActorTag } from '@/Engine/Domains/Actor';
import type { IAppCanvas } from '@/Engine/Domains/App';
import type { ICameraConfig, ICameraFactory, ICameraRegistry, ICameraWrapper } from '@/Engine/Domains/Camera';
import { CameraFactory, CameraRegistry, CameraTag } from '@/Engine/Domains/Camera';
import type { IControlsConfig, IControlsFactory, IControlsRegistry, IOrbitControlsWrapper } from '@/Engine/Domains/Controls';
import { ControlsFactory, ControlsRegistry } from '@/Engine/Domains/Controls';
import type { IIntersectionsWatcher, IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Domains/Intersections';
import { IntersectionsWatcherFactory, IntersectionsWatcherRegistry } from '@/Engine/Domains/Intersections';
import { withBuiltMixin } from '@/Engine/Domains/Level/Mixin';
import type { ILevel, ILevelConfig, IWithBuilt } from '@/Engine/Domains/Level/Models';
import type { ILightConfig, ILightFactory, ILightRegistry, ILightWrapper } from '@/Engine/Domains/Light';
import { LightFactory, LightRegistry } from '@/Engine/Domains/Light';
import type { ILoopFactory, ILoopRegistry, ILoopWrapper } from '@/Engine/Domains/Loop';
import { LoopFactory, LoopRegistry, LoopTag } from '@/Engine/Domains/Loop';
import type { IRendererFactory, IRendererRegistry, IRendererWrapper } from '@/Engine/Domains/Renderer';
import { RendererFactory, RendererModes, RendererRegistry, RendererTag } from '@/Engine/Domains/Renderer';
import type { ISceneConfig, ISceneFactory, ISceneRegistry, ISceneWrapper } from '@/Engine/Domains/Scene';
import { SceneFactory, SceneRegistry, SceneTag } from '@/Engine/Domains/Scene';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { isDefined, isNotDefined, isValidLevelConfig } from '@/Engine/Utils';

export function buildLevelFromConfig(canvas: IAppCanvas, config: ILevelConfig): ILevel {
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
  const initialCamera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(CameraTag.Initial);

  const intersectionsWatcherFactory: IIntersectionsWatcherFactory = IntersectionsWatcherFactory();
  const intersectionsWatcherRegistry: IIntersectionsWatcherRegistry = IntersectionsWatcherRegistry();
  let intersectionsWatcher: IIntersectionsWatcher | undefined;
  let intersectionsWatcherEntityCreatedSubscription: Subscription | undefined;
  if (isDefined(initialCamera)) {
    intersectionsWatcherEntityCreatedSubscription = intersectionsWatcherFactory.entityCreated$.subscribe((intersectionsWatcher: IIntersectionsWatcher): void =>
      intersectionsWatcherRegistry.add({ ...intersectionsWatcher, tags: [...intersectionsWatcher.tags, CommonTag.FromConfig] })
    );
    intersectionsWatcher = intersectionsWatcherFactory.create({ actors: clickableActors, camera: initialCamera, positionWatcher: ambientContext.mousePositionWatcher });
  }

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

  const destroyable: IDestroyable = destroyableMixin();
  const builtMixin: IWithBuilt = withBuiltMixin();

  destroyable.destroyed$.subscribe(() => {
    builtMixin.built$.complete();

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

    if (isDefined(intersectionsWatcherEntityCreatedSubscription)) intersectionsWatcherEntityCreatedSubscription.unsubscribe();
    intersectionsWatcherFactory.destroy();
    intersectionsWatcherRegistry.destroy();

    loopEntityCreatedSubscription.unsubscribe();
    loopFactory.destroy();
    loopRegistry.destroy();

    rendererEntityCreatedSubscription.unsubscribe();
    rendererFactory.destroy();
    rendererRegistry.destroy();
  });

  builtMixin.build();

  return {
    name,
    start(): ILoopWrapper {
      if (isDefined(intersectionsWatcher)) intersectionsWatcher.start();
      loop.start(renderer, scene, controlsRegistry, initialCamera);
      return loop;
    },
    stop(): void {
      if (isDefined(intersectionsWatcher)) intersectionsWatcher.stop();
      // TODO (S.Panfilov) implement stop
      // loop.stop(renderer, scene, initialCamera, controlsRegistry);
    },
    registry: {
      actor: actorRegistry,
      camera: cameraRegistry,
      light: lightRegistry,
      controls: controlsRegistry,
      intersectionsWatcher: intersectionsWatcherRegistry,
      loop: loopRegistry,
      scenes: sceneRegistry,
      renderer: rendererRegistry
    },
    factory: {
      actor: actorFactory,
      camera: cameraFactory,
      light: lightFactory,
      controls: controlsFactory,
      intersectionsWatcher: intersectionsWatcherFactory,
      loop: loopFactory,
      scenes: sceneFactory,
      renderer: rendererFactory
    },
    tags,
    ...builtMixin,
    built$: builtMixin.built$.asObservable(),
    ...destroyable
  };
}
