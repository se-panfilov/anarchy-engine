import type { Subscription } from 'rxjs';
import { ReplaySubject } from 'rxjs';

import type { IActorAsyncRegistry, IActorFactory, IActorService } from '@/Engine/Actor';
import { ActorAsyncRegistry, ActorFactory, ActorService } from '@/Engine/Actor';
import type { IAppCanvas } from '@/Engine/App';
import type { ICameraFactory, ICameraRegistry, ICameraService, ICameraWrapper } from '@/Engine/Camera';
import { CameraFactory, CameraRegistry, CameraService } from '@/Engine/Camera';
import { ambientContext } from '@/Engine/Context';
import type { IControlsFactory, IControlsRegistry, IControlsService, IOrbitControlsWrapper } from '@/Engine/Controls';
import { ControlService, ControlsFactory, ControlsRegistry } from '@/Engine/Controls';
import type { IDataTexture, IEnvMapService } from '@/Engine/EnvMap';
import { EnvMapService } from '@/Engine/EnvMap';
import type { IFogFactory, IFogRegistry, IFogService } from '@/Engine/Fog';
import { FogFactory, FogRegistry, FogService } from '@/Engine/Fog';
import type { IIntersectionsService, IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Intersections';
import { IntersectionsService, IntersectionsWatcherFactory, IntersectionsWatcherRegistry } from '@/Engine/Intersections';
import type { ILightFactory, ILightRegistry, ILightService } from '@/Engine/Light';
import { LightFactory, LightRegistry, LightService } from '@/Engine/Light';
import type { ILoopService, ILoopTimes } from '@/Engine/Loop';
import { LoopService } from '@/Engine/Loop';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic';
import type { IRendererFactory, IRendererRegistry, IRendererService, IRendererWrapper } from '@/Engine/Renderer';
import { RendererFactory, RendererModes, RendererRegistry, RendererService } from '@/Engine/Renderer';
import type { ISceneFactory, ISceneRegistry, IScenesService, ISceneWrapper } from '@/Engine/Scene';
import { SceneFactory, SceneRegistry, ScenesService } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import { withBuiltMixin } from '@/Engine/Space/Mixin';
import type { ISpace, ISpaceConfig, ISpaceServices, IWithBuilt } from '@/Engine/Space/Models';
import { getBoolValue } from '@/Engine/Space/SpaceHelper';
import type { IText2dRegistry, IText2dRenderer, IText3dRegistry, IText3dRenderer, ITextFactory, ITextService } from '@/Engine/Text';
import { initText2dRenderer, initText3dRenderer, Text2dRegistry, Text3dRegistry, TextFactory, TextService } from '@/Engine/Text';
import { isDefined, isDestroyable, isNotDefined, validLevelConfig } from '@/Engine/Utils';

export function buildSpaceFromConfig(canvas: IAppCanvas, config: ISpaceConfig): ISpace {
  const { isValid, errors } = validLevelConfig(config);
  if (!isValid) {
    console.error(errors);
    throw new Error('Failed to launch a space: invalid data format');
  }

  const { initSpace, name, actors, cameras, lights, fogs, texts, controls, scenes, tags } = config;
  const messages$: ReplaySubject<string> = new ReplaySubject<string>();

  const isScenesInit: boolean = getBoolValue('isScenesInit', initSpace);
  const isActorsInit: boolean = getBoolValue('isActorsInit', initSpace);
  const isCamerasInit: boolean = getBoolValue('isCamerasInit', initSpace);
  const isLightsInit: boolean = getBoolValue('isLightsInit', initSpace);
  const isFogsInit: boolean = getBoolValue('isFogsInit', initSpace);
  const isTextsInit: boolean = getBoolValue('isTextsInit', initSpace);
  const isControlsInit: boolean = getBoolValue('isControlsInit', initSpace);
  const isEnvMapsInit: boolean = getBoolValue('isEnvMapsInit', initSpace);
  const isRendererInit: boolean = getBoolValue('isRendererInit', initSpace);
  const isLoopInit: boolean = getBoolValue('isLoopInit', initSpace);
  const isInitIntersections: boolean = getBoolValue('isInitIntersections', initSpace);

  screenService.setCanvas(canvas);

  let scene: ISceneWrapper | undefined = undefined;
  let services: ISpaceServices = {};

  let cameraRegistry: ICameraRegistry | undefined;
  let rendererRegistry: IRendererRegistry | undefined;
  let controlsRegistry: IControlsRegistry | undefined;
  let text2dRegistry: IText2dRegistry | undefined;
  let text3dRegistry: IText3dRegistry | undefined;

  let text2dRenderer: IText2dRenderer | undefined;
  let text3dRenderer: IText3dRenderer | undefined;
  let renderer: IRendererWrapper | undefined;

  //build scenes
  if (isScenesInit) {
    const sceneFactory: ISceneFactory = SceneFactory();
    const sceneRegistry: ISceneRegistry = SceneRegistry();
    const scenesService: IScenesService = ScenesService(sceneFactory, sceneRegistry);

    scenesService.createFromConfig(scenes);

    messages$.next(`Scenes (${scenes.length}) created`);
    scene = scenesService.findActiveScene();
    if (isNotDefined(scene)) throw new Error(`Cannot find the current scene for space "${name}" during the space building.`);

    services = { ...services, scenesService };
  }

  //build actors
  if (isActorsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for actors initialization');

    const actorFactory: IActorFactory = ActorFactory();
    const actorRegistry: IActorAsyncRegistry = ActorAsyncRegistry();
    const actorService: IActorService = ActorService(actorFactory, actorRegistry, scene);

    actorService.createFromConfig(actors);

    services = { ...services, actorService };
    messages$.next(`Actors (${actors.length}) created (async))`);
  }

  //build texts
  if (isTextsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for texts initialization');

    const textFactory: ITextFactory = TextFactory();

    text2dRenderer = initText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
    text3dRenderer = initText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);

    text2dRegistry = Text2dRegistry();
    text3dRegistry = Text3dRegistry();

    const textService: ITextService = TextService(textFactory, text2dRegistry, text3dRegistry, scene);

    services = { ...services, textService };

    messages$.next(`Texts (${texts.length}) created`);
  }

  //build cameras
  if (isCamerasInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for cameras initialization');
    const cameraFactory: ICameraFactory = CameraFactory();
    cameraRegistry = CameraRegistry();
    const cameraService: ICameraService = CameraService(cameraFactory, cameraRegistry, scene);

    cameraService.createFromConfig(cameras);

    services = { ...services, cameraService };

    messages$.next(`Cameras (${cameras.length}) created`);
  }

  //build controls
  if (isControlsInit) {
    if (isNotDefined(isCamerasInit)) throw new Error('Camera initialization should be "true" for controls initialization');
    if (isNotDefined(services.cameraService)) throw new Error('Cannot find camera service for controls initialization');
    const camera: ICameraWrapper | undefined = services.cameraService.findActiveCamera();
    if (isNotDefined(camera)) throw new Error('Cannot find active camera for controls initialization');

    const controlsFactory: IControlsFactory = ControlsFactory();
    controlsRegistry = ControlsRegistry();
    const controlsService: IControlsService = ControlService(controlsFactory, controlsRegistry, camera, canvas);

    controlsService.createFromConfig(controls);

    services = { ...services, controlsService };
    messages$.next(`Controls (${controls.length}) created`);
  }

  //build lights
  if (isLightsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for lights initialization');

    const lightFactory: ILightFactory = LightFactory();
    const lightRegistry: ILightRegistry = LightRegistry();
    const lightService: ILightService = LightService(lightFactory, lightRegistry, scene);

    lightService.createFromConfig(lights);

    services = { ...services, lightService };
    messages$.next(`Lights (${lights.length}) created`);
  }

  if (isInitIntersections) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for intersections initialization');
    if (isNotDefined(cameraRegistry)) throw new Error('Cannot find camera registry for intersections initialization');

    const intersectionsWatcherFactory: IIntersectionsWatcherFactory = IntersectionsWatcherFactory();
    const intersectionsWatcherRegistry: IIntersectionsWatcherRegistry = IntersectionsWatcherRegistry();
    const intersectionsService: IIntersectionsService = IntersectionsService(intersectionsWatcherFactory, intersectionsWatcherRegistry);

    // TODO (S.Panfilov) We need to load intersections from config as well as the other entities

    services = { ...services, intersectionsService };
    messages$.next(`Intersections watcher created`);
  }

  //build fogs
  if (isFogsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for fogs initialization');

    const fogFactory: IFogFactory = FogFactory();
    const fogRegistry: IFogRegistry = FogRegistry();
    const fogService: IFogService = FogService(fogFactory, fogRegistry, scene);

    fogService.createFromConfig(fogs);

    services = { ...services, fogService };
    messages$.next(`Fogs (${fogs.length}) created`);
  }

  //env maps
  if (isEnvMapsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for fogs initialization');
    const envMapService: IEnvMapService = EnvMapService();

    envMapService.added$.subscribe((texture: IDataTexture): void => {
      scene.setBackground(texture);
      scene.setEnvironmentMap(texture);
      messages$.next(`Env map added: "${texture.id}"`);
    });
    services = { ...services, envMapService };
  }

  //build renderer
  if (isRendererInit) {
    const rendererFactory: IRendererFactory = RendererFactory();
    rendererRegistry = RendererRegistry();
    const rendererService: IRendererService = RendererService(rendererFactory, rendererRegistry);

    renderer = rendererService.create({ canvas, tags: [], mode: RendererModes.WebGL2, isActive: true });

    services = { ...services, rendererService };
    messages$.next(`Renderer ("${renderer.id}") created`);
  }

  let loopTick$: Subscription | undefined;
  if (isLoopInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for loop initialization');
    if (isNotDefined(cameraRegistry)) throw new Error('Cannot find camera registry for loop initialization');
    if (isNotDefined(rendererRegistry)) throw new Error('Cannot find renderer registry for loop initialization');
    if (isNotDefined(renderer)) throw new Error('Cannot find renderer');
    if (isNotDefined(controlsRegistry)) throw new Error('Cannot find controls registry for loop initialization');
    const loopService: ILoopService = LoopService();
    services = { ...services, loopService };

    loopTick$ = loopService.tick$.subscribe(({ delta }: ILoopTimes): void => {
      const activeCamera: ICameraWrapper | undefined = services.cameraService?.findActiveCamera();
      if (isDefined(activeCamera)) {
        if (isNotDefined(renderer)) throw new Error('Cannot find renderer');
        renderer.entity.render(scene.entity, activeCamera.entity);
        // TODO (S.Panfilov) update these text renderers only when there are any text (or maybe only when it's changed)
        if (isTextsInit) {
          if (!text2dRegistry?.isEmpty()) text2dRenderer?.renderer.render(scene.entity, activeCamera.entity);
          if (!text3dRegistry?.isEmpty()) text3dRenderer?.renderer.render(scene.entity, activeCamera.entity);
        }
      }

      if (isNotDefined(loopTick$)) throw new Error('Loop tick subscription is not defined');

      // just for control's damping
      controlsRegistry?.getAll().forEach((controls: IOrbitControlsWrapper): void => {
        if (controls.entity.enableDamping) controls.entity.update(delta);
      });
    });
  }

  const destroyable: IDestroyable = destroyableMixin();
  const builtMixin: IWithBuilt = withBuiltMixin();

  destroyable.destroyed$.subscribe(() => {
    builtMixin.built$.complete();
    Object.values(services).forEach((service): void => void (isDestroyable(service) && service.destroy()));
    messages$.next('Space destroyed');
    messages$.complete();
  });

  builtMixin.build();

  return {
    name,
    start(): void {
      if (isNotDefined(services.loopService)) throw new Error('Cannot start space, loop service is not defined');
      services.loopService.start();
      messages$.next(`Space started`);
    },
    stop(): void {
      // TODO (S.Panfilov) implement stop
      // if (isDefined(intersectionsWatcher)) intersectionsWatcher.stop();
      // loop.stop(renderer, scene, controlsRegistry, cameraRegistry);
      messages$.next(`Space stopped`);
    },
    services,
    ...builtMixin,
    built$: builtMixin.built$.asObservable(),
    ...destroyable,
    ...withTags(tags),
    messages$: messages$.asObservable()
  };
}
