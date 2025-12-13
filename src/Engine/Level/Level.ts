import type { Subscription } from 'rxjs';
import { merge, ReplaySubject } from 'rxjs';

import { CommonTag } from '@/Engine/Abstract';
import type { IActorConfig, IActorFactory, IActorRegistry, IActorWrapper } from '@/Engine/Actor';
import { ActorFactory, ActorRegistry, ActorTag } from '@/Engine/Actor';
import type { IAppCanvas } from '@/Engine/App';
import type { ICameraConfig, ICameraFactory, ICameraRegistry, ICameraWrapper } from '@/Engine/Camera';
import { CameraFactory, CameraRegistry, CameraTag } from '@/Engine/Camera';
import { ambientContext } from '@/Engine/Context';
import type { IControlsFactory, IControlsRegistry, IOrbitControlsConfig, IOrbitControlsWrapper } from '@/Engine/Controls';
import { ControlsFactory, ControlsRegistry } from '@/Engine/Controls';
import type { IDataTexture } from '@/Engine/EnvMap';
import { envMapService } from '@/Engine/EnvMap';
import type { IIntersectionsWatcher, IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Intersections';
import { IntersectionsWatcherFactory, IntersectionsWatcherRegistry } from '@/Engine/Intersections';
import { withBuiltMixin } from '@/Engine/Level/Mixin';
import type { ILevel, ILevelConfig, IWithBuilt } from '@/Engine/Level/Models';
import type { ILightConfig, ILightFactory, ILightRegistry, ILightWrapper } from '@/Engine/Light';
import { LightFactory, LightRegistry } from '@/Engine/Light';
import type { ILoopTimes } from '@/Engine/Loop';
import { standardLoopService } from '@/Engine/Loop';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic/WithTags';
import type { IRendererFactory, IRendererRegistry, IRendererWrapper } from '@/Engine/Renderer';
import { RendererFactory, RendererModes, RendererRegistry, RendererTag } from '@/Engine/Renderer';
import type { ISceneConfig, ISceneFactory, ISceneRegistry, ISceneWrapper } from '@/Engine/Scene';
import { SceneFactory, SceneRegistry, SceneTag } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import type { IText2dRegistry, IText2dRenderer, IText3dRegistry, IText3dRenderer, ITextAnyWrapper, ITextConfig, ITextFactory } from '@/Engine/Text';
import { initText2dRenderer, initText3dRenderer, isText2dWrapper, isText3dWrapper, Text2dRegistry, Text3dRegistry, TextFactory } from '@/Engine/Text';
import { isDefined, isNotDefined, isValidLevelConfig } from '@/Engine/Utils';

export function buildLevelFromConfig(canvas: IAppCanvas, config: ILevelConfig): ILevel {
  if (!isValidLevelConfig(config)) throw new Error('Failed to launch a level: invalid data format');
  const { name, actors, cameras, lights, texts, controls, scenes, tags } = config;

  screenService.setCanvas(canvas);

  const messages$: ReplaySubject<string> = new ReplaySubject<string>();

  // TODO (S.Panfilov) refactor this maybe with command/strategy pattern?
  //build scene
  const sceneFactory: ISceneFactory = SceneFactory();
  const sceneRegistry: ISceneRegistry = SceneRegistry();
  const sceneEntityCreatedSubscription: Subscription = sceneFactory.entityCreated$.subscribe((scene: ISceneWrapper): void => sceneRegistry.add(scene));
  scenes.forEach((scene: ISceneConfig): ISceneWrapper => sceneFactory.create(sceneFactory.configToParams({ ...scene, tags: [...scene.tags, CommonTag.FromConfig] })));
  messages$.next(`Scenes (${scenes.length}) created`);

  const scene: ISceneWrapper | undefined = sceneRegistry.getUniqByTag(SceneTag.Current);
  if (isNotDefined(scene)) throw new Error(`Cannot find the current scene for level "${name}" during the level building.`);

  //build actors
  const actorFactory: IActorFactory = ActorFactory();
  const actorRegistry: IActorRegistry = ActorRegistry();
  const actorAddedSubscription: Subscription = actorRegistry.added$.subscribe((actor: IActorWrapper) => scene.addActor(actor));
  const actorEntityCreatedSubscription: Subscription = actorFactory.entityCreated$.subscribe((actor: IActorWrapper): void => actorRegistry.add(actor));
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  actors.forEach((actor: IActorConfig): Promise<IActorWrapper> => actorFactory.createAsync(actorFactory.configToParams({ ...actor, tags: [...actor.tags, CommonTag.FromConfig] })));
  messages$.next(`Actors (${actors.length}) created`);

  //build texts
  const text2dRenderer: IText2dRenderer = initText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  const text3dRenderer: IText3dRenderer = initText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  const textFactory: ITextFactory = TextFactory();
  const text2dRegistry: IText2dRegistry = Text2dRegistry();
  const text3dRegistry: IText3dRegistry = Text3dRegistry();
  const textAddedSubscription: Subscription = merge(text2dRegistry.added$, text3dRegistry.added$).subscribe((text: ITextAnyWrapper) => scene.addText(text));
  const textEntityCreatedSubscription: Subscription = textFactory.entityCreated$.subscribe((text: ITextAnyWrapper): void => {
    if (isText2dWrapper(text)) text2dRegistry.add(text);
    if (isText3dWrapper(text)) text3dRegistry.add(text);
  });
  texts.forEach((text: ITextConfig): ITextAnyWrapper => textFactory.create(textFactory.configToParams({ ...text, tags: [...text.tags, CommonTag.FromConfig] })));
  messages$.next(`Texts (${texts.length}) created`);

  //build cameras
  const cameraFactory: ICameraFactory = CameraFactory();
  const cameraRegistry: ICameraRegistry = CameraRegistry();
  const cameraAddedSubscription: Subscription = cameraRegistry.added$.subscribe((camera: ICameraWrapper) => scene.addCamera(camera));
  const cameraEntityCreatedSubscription: Subscription = cameraFactory.entityCreated$.subscribe((camera: ICameraWrapper): void => cameraRegistry.add(camera));
  cameras.forEach((camera: ICameraConfig): ICameraWrapper => cameraFactory.create(cameraFactory.configToParams({ ...camera, tags: [...camera.tags, CommonTag.FromConfig] })));
  messages$.next(`Cameras (${cameras.length}) created`);

  //build controls
  const controlsFactory: IControlsFactory = ControlsFactory();
  const controlsRegistry: IControlsRegistry = ControlsRegistry();
  const controlsEntityCreatedSubscription: Subscription = controlsFactory.entityCreated$.subscribe((controls: IOrbitControlsWrapper): void => controlsRegistry.add(controls));
  controls.forEach(
    (control: IOrbitControlsConfig): IOrbitControlsWrapper =>
      controlsFactory.create(controlsFactory.configToParams({ ...control, tags: [...control.tags, CommonTag.FromConfig] }, { cameraRegistry, canvas }))
  );
  messages$.next(`Controls (${controls.length}) created`);

  const clickableActors: ReadonlyArray<IActorWrapper> = actorRegistry.getAllWithEveryTag([ActorTag.Intersectable]);
  const initialCamera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(CameraTag.Initial);

  //build intersections watcher
  const intersectionsWatcherFactory: IIntersectionsWatcherFactory = IntersectionsWatcherFactory();
  const intersectionsWatcherRegistry: IIntersectionsWatcherRegistry = IntersectionsWatcherRegistry();
  let intersectionsWatcher: IIntersectionsWatcher | undefined;
  let intersectionsWatcherEntityCreatedSubscription: Subscription | undefined;
  if (isDefined(initialCamera)) {
    initialCamera.addTag(CameraTag.Active);
    intersectionsWatcherEntityCreatedSubscription = intersectionsWatcherFactory.entityCreated$.subscribe((intersectionsWatcher: IIntersectionsWatcher): void => {
      intersectionsWatcher.addTag(CommonTag.FromConfig);
      intersectionsWatcherRegistry.add(intersectionsWatcher);
    });
    intersectionsWatcher = intersectionsWatcherFactory.create({ actors: clickableActors, camera: initialCamera, positionWatcher: ambientContext.mousePositionWatcher });
    messages$.next(`Intersections watcher created`);
  } else {
    messages$.next(`WARNING: no initial camera`);
  }

  //build lights
  const lightFactory: ILightFactory = LightFactory();
  const lightRegistry: ILightRegistry = LightRegistry();
  const lightAddedSubscription: Subscription = lightRegistry.added$.subscribe((light: ILightWrapper) => scene.addLight(light));
  const lightEntityCreatedSubscription: Subscription = lightFactory.entityCreated$.subscribe((light: ILightWrapper): void => lightRegistry.add(light));
  lights.forEach((light: ILightConfig): ILightWrapper => lightFactory.create(lightFactory.configToParams({ ...light, tags: [...light.tags, CommonTag.FromConfig] })));
  messages$.next(`Lights (${lights.length}) created`);

  //env maps
  envMapService.added$.subscribe((texture: IDataTexture): void => {
    scene.setBackground(texture);
    scene.setEnvironmentMap(texture);
    messages$.next(`Env map added: "${texture.id}"`);
  });

  //build renderer
  const rendererFactory: IRendererFactory = RendererFactory();
  const rendererRegistry: IRendererRegistry = RendererRegistry();
  const rendererEntityCreatedSubscription: Subscription = rendererFactory.entityCreated$.subscribe((renderer: IRendererWrapper): void => rendererRegistry.add(renderer));
  const renderer: IRendererWrapper = rendererFactory.create({ canvas, tags: [RendererTag.Main], mode: RendererModes.WebGL2 });
  messages$.next(`Renderer created`);

  const loopTickSubscription: Subscription = standardLoopService.tick$.subscribe(({ delta }: ILoopTimes): void => {
    const activeCamera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(CameraTag.Active);
    if (isDefined(activeCamera)) {
      renderer.entity.render(scene.entity, activeCamera.entity);
      // TODO (S.Panfilov) update these text renderers only when there are any text (or maybe only when it's changed)
      if (!text2dRegistry.isEmpty()) text2dRenderer.renderer.render(scene.entity, activeCamera.entity);
      if (!text3dRegistry.isEmpty()) text3dRenderer.renderer.render(scene.entity, activeCamera.entity);
    }

    // TODO (S.Panfilov) also perhaps make a controls service instead of a factory?
    // just for control's damping
    controlsRegistry.getAll().forEach((controls: IOrbitControlsWrapper): void => {
      if (controls.entity.enableDamping) controls.entity.update(delta);
    });
  });

  const destroyable: IDestroyable = destroyableMixin();
  const builtMixin: IWithBuilt = withBuiltMixin();

  destroyable.destroyed$.subscribe(() => {
    builtMixin.built$.complete();

    sceneEntityCreatedSubscription.unsubscribe();

    actorEntityCreatedSubscription.unsubscribe();
    actorFactory.destroy();
    actorAddedSubscription.unsubscribe();
    actorRegistry.destroy();

    textEntityCreatedSubscription.unsubscribe();
    textFactory.destroy();
    textAddedSubscription.unsubscribe();
    text2dRegistry.destroy();
    text3dRegistry.destroy();

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

    rendererEntityCreatedSubscription.unsubscribe();
    rendererFactory.destroy();
    rendererRegistry.destroy();

    loopTickSubscription.unsubscribe();

    messages$.complete();
  });

  builtMixin.build();

  return {
    name,
    start(): void {
      if (isDefined(intersectionsWatcher)) intersectionsWatcher.start();
      standardLoopService.start();
      messages$.next(`Level started`);
    },
    stop(): void {
      if (isDefined(intersectionsWatcher)) intersectionsWatcher.stop();
      // TODO (S.Panfilov) implement stop
      // loop.stop(renderer, scene, controlsRegistry, cameraRegistry);
      messages$.next(`Level stopped`);
    },
    entities: {
      actorRegistry: actorRegistry,
      actorFactory: actorFactory,
      text2dRegistry: text2dRegistry,
      text3dRegistry: text3dRegistry,
      textFactory: textFactory,
      cameraRegistry: cameraRegistry,
      cameraFactory: cameraFactory,
      lightRegistry: lightRegistry,
      lightFactory: lightFactory,
      controlsRegistry: controlsRegistry,
      controlsFactory: controlsFactory,
      intersectionsWatcherRegistry: intersectionsWatcherRegistry,
      intersectionsWatcherFactory: intersectionsWatcherFactory,
      scenesRegistry: sceneRegistry,
      scenesFactory: sceneFactory,
      rendererRegistry: rendererRegistry,
      rendererFactory: rendererFactory
    },
    ...builtMixin,
    built$: builtMixin.built$.asObservable(),
    ...destroyable,
    ...withTags(tags),
    messages$: messages$.asObservable()
  };
}
