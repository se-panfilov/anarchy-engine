import type { Subscription } from 'rxjs';
import { ReplaySubject } from 'rxjs';

import type { IActorAsyncRegistry, IActorFactory } from '@/Engine/Actor';
import { ActorAsyncRegistry, ActorFactory, ActorService } from '@/Engine/Actor';
import type { IAppCanvas } from '@/Engine/App';
import type { ICameraFactory, ICameraRegistry, ICameraWrapper } from '@/Engine/Camera';
import { CameraFactory, CameraRegistry, CameraService } from '@/Engine/Camera';
import { ambientContext } from '@/Engine/Context';
import type { IControlsFactory, IControlsRegistry, IOrbitControlsWrapper } from '@/Engine/Controls';
import { ControlService, ControlsFactory, ControlsRegistry } from '@/Engine/Controls';
import type { IDataTexture } from '@/Engine/EnvMap';
import { EnvMapService } from '@/Engine/EnvMap';
import type { IFogFactory, IFogRegistry } from '@/Engine/Fog';
import { FogFactory, FogRegistry, FogService } from '@/Engine/Fog';
import type { IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Intersections';
import { IntersectionsService, IntersectionsWatcherFactory, IntersectionsWatcherRegistry } from '@/Engine/Intersections';
import type { ILightFactory, ILightRegistry } from '@/Engine/Light';
import { LightFactory, LightRegistry, LightService } from '@/Engine/Light';
import type { ILoopService, ILoopTimes } from '@/Engine/Loop';
import { LoopService } from '@/Engine/Loop';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic';
import type { IRendererFactory, IRendererRegistry, IRendererWrapper } from '@/Engine/Renderer';
import { RendererFactory, RendererModes, RendererRegistry, RendererService } from '@/Engine/Renderer';
import type { ISceneFactory, ISceneRegistry, IScenesService, ISceneWrapper } from '@/Engine/Scene';
import { SceneFactory, SceneRegistry, ScenesService } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import { withBuiltMixin } from '@/Engine/Space/Mixin';
import type { ISpace, ISpaceConfig, ISpaceServices, IWithBuilt } from '@/Engine/Space/Models';
import type { IText2dRegistry, IText2dRenderer, IText3dRegistry, IText3dRenderer, ITextFactory } from '@/Engine/Text';
import { initText2dRenderer, initText3dRenderer, Text2dRegistry, Text3dRegistry, TextFactory, TextService } from '@/Engine/Text';
import { isDefined, isDestroyable, isNotDefined, validLevelConfig } from '@/Engine/Utils';
import { initSceneServices } from '@/Engine/Space/SpaceHelpers';

export function buildSpaceFromConfig(canvas: IAppCanvas, config: ISpaceConfig): ISpace {
  const { isValid, errors } = validLevelConfig(config);
  if (!isValid) {
    console.error(errors);
    throw new Error('Failed to launch a space: invalid data format');
  }

  const { name, actors, cameras, lights, fogs, texts, controls, scenes, tags } = config;
  const messages$: ReplaySubject<string> = new ReplaySubject<string>();

  screenService.setCanvas(canvas);

  const sceneFactory: ISceneFactory = SceneFactory();
  const sceneRegistry: ISceneRegistry = SceneRegistry();

  //build scenes
  const scenesService: IScenesService = ScenesService(sceneFactory, sceneRegistry);
  scenesService.createFromConfig(scenes);
  messages$.next(`Scenes (${scenes.length}) created`);

  const scene: ISceneWrapper | undefined = scenesService.findActiveScene();
  if (isNotDefined(scene)) throw new Error(`Cannot find the current scene for space "${name}" during the space building.`);

  initSceneServices(scene, canvas);

  //build cameras
  cameraService.createFromConfig(cameras);
  messages$.next(`Cameras (${cameras.length}) created`);

  const camera: ICameraWrapper | undefined = cameraService.findActiveCamera();
  if (isNotDefined(camera)) throw new Error(`Cannot find the active camera for space "${name}" during the space building.`);

  //build actors
  if (isNotDefined(scene)) throw new Error('Scene should be initialized for actors initialization');
  services.actorService.createFromConfig(actors);
  messages$.next(`Actors (${actors.length}) created (async))`);

  //build texts
  const text2dRenderer: IText2dRenderer = initText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  const text3dRenderer: IText3dRenderer = initText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  messages$.next(`Texts (${texts.length}) created`);

  //build controls
  services.controlsService.createFromConfig(controls);
  messages$.next(`Controls (${controls.length}) created`);

  //build lights
  lightService.createFromConfig(lights);
  messages$.next(`Lights (${lights.length}) created`);
  // TODO (S.Panfilov) We need to load intersections from config as well as the other entities
  messages$.next(`Intersections watcher created`);

  //build fogs
  fogService.createFromConfig(fogs);
  messages$.next(`Fogs (${fogs.length}) created`);

  //env maps
  envMapService.added$.subscribe((texture: IDataTexture): void => {
    scene.setBackground(texture);
    scene.setEnvironmentMap(texture);
    messages$.next(`Env map added: "${texture.id}"`);
  });

  //build renderer
  const renderer: IRendererWrapper = rendererService.create({ canvas, tags: [], mode: RendererModes.WebGL2, isActive: true });
  messages$.next(`Renderer ("${renderer.id}") created`);

  //build loop
  const loopService: ILoopService = LoopService();

  const loopTick$: Subscription = loopService.tick$.subscribe(({ delta }: ILoopTimes): void => {
    const activeCamera: ICameraWrapper | undefined = cameraService?.findActiveCamera();
    if (isDefined(activeCamera)) {
      if (isNotDefined(renderer)) throw new Error('Cannot find renderer');
      renderer.entity.render(scene.entity, activeCamera.entity);
      // TODO (S.Panfilov) update these text renderers only when there are any text (or maybe only when it's changed)
      if (!text2dRegistry?.isEmpty()) text2dRenderer?.renderer.render(scene.entity, activeCamera.entity);
      if (!text3dRegistry?.isEmpty()) text3dRenderer?.renderer.render(scene.entity, activeCamera.entity);
    }

    if (isNotDefined(loopTick$)) throw new Error('Loop tick subscription is not defined');

    // just for control's damping
    controlsRegistry?.getAll().forEach((controls: IOrbitControlsWrapper): void => {
      if (controls.entity.enableDamping) controls.entity.update(delta);
    });
  });

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
      loopService.start();
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
