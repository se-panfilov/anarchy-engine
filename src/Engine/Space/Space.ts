import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { IAppCanvas } from '@/Engine/App';
import type { ICameraWrapper } from '@/Engine/Camera';
import { ambientContext } from '@/Engine/Context';
import type { IDataTexture } from '@/Engine/EnvMap';
import type { IIntersectionConfig, IIntersectionsWatcher } from '@/Engine/Intersections';
import type { ILoopTimes } from '@/Engine/Loop';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins/Generic';
import type { IRendererWrapper } from '@/Engine/Renderer';
import { RendererModes } from '@/Engine/Renderer';
import type { IScenesService, ISceneWrapper } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import { withBuiltMixin } from '@/Engine/Space/Mixin';
import type { ISpace, ISpaceConfig, ISpaceServices, IWithBuilt } from '@/Engine/Space/Models';
import { initServices } from '@/Engine/Space/SpaceHelpers';
import { spaceLoop } from '@/Engine/Space/SpaceLoop';
import type { IText2dRenderer, IText3dRenderer } from '@/Engine/Text';
import { initText2dRenderer, initText3dRenderer } from '@/Engine/Text';
import { isDefined, isDestroyable, isNotDefined, validLevelConfig } from '@/Engine/Utils';

export function buildSpaceFromConfig(canvas: IAppCanvas, config: ISpaceConfig): ISpace {
  const { isValid, errors } = validLevelConfig(config);
  if (!isValid) {
    // TODO (S.Panfilov) should be forwarded to the errors hub (which is not implemented yet)
    console.error(errors);
    throw new Error('Failed to launch a space: invalid data format');
  }

  const { name, actors, cameras, intersections, lights, fogs, texts, controls, scenes, tags } = config;

  screenService.setCanvas(canvas);

  let activeScene: ISceneWrapper;
  const services: ISpaceServices = initServices(canvas, (scenesService: IScenesService): ISceneWrapper | never => {
    scenesService.createFromConfig(scenes);
    const scene: ISceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(scene)) throw new Error(`Cannot find an active scene for space "${name}" during space's services initialization.`);
    activeScene = scene;
    return activeScene;
  });

  const { actorService, cameraService, controlsService, lightService, loopService, fogService, envMapService, textService, rendererService, intersectionsService } = services;

  cameraService.createFromConfig(cameras);
  actorService.createFromConfig(actors);

  const text2dRenderer: IText2dRenderer = initText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  const text3dRenderer: IText3dRenderer = initText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService.createFromConfig(texts);

  controlsService.createFromConfig(controls, cameraService.getRegistry());
  lightService.createFromConfig(lights);

  //build intersections
  if (isDefined(intersections) && intersections.length > 0) {
    actorService.getRegistry().added$.subscribe((actorWrapper: IActorWrapperAsync): void => {
      if (isDefined(actorWrapper.name)) {
        const intersection: IIntersectionConfig | undefined = intersections.find((int: IIntersectionConfig) => isDefined(actorWrapper.name) && int.actorNames.includes(actorWrapper.name));
        if (isNotDefined(intersection)) return;
        const camera: ICameraWrapper | undefined = cameraService.getRegistry().findByName(intersection.cameraName);
        if (isNotDefined(camera)) throw new Error(`Intersections: Cannot find camera ("${intersection.cameraName}") for actor ("${actorWrapper.name}")`);
        const watcherId: IIntersectionsWatcher = intersectionsService.buildWatcher(camera);
        intersectionsService.addActorsToWatcher(watcherId.id, [actorWrapper]);
      }
      // TODO (S.Panfilov) turn of intersections watcher for inactive cameras (then turn on again on active)
      // TODO (S.Panfilov) we need a normal logging from services (which service with which id do what)
      // TODO (S.Panfilov) add validation for intersections config (names, uniq, patterns, etc)
    });
  }

  fogService.createFromConfig(fogs);

  envMapService.added$.subscribe((texture: IDataTexture): void => {
    activeScene.setBackground(texture);
    activeScene.setEnvironmentMap(texture);
  });

  const renderer: IRendererWrapper = rendererService.create({ canvas, tags: [], mode: RendererModes.WebGL2, isActive: true });
  const { text2dRegistry, text3dRegistry } = textService.getRegistries();
  const controlsRegistry = controlsService.getRegistry();

  let camera: ICameraWrapper | undefined;
  cameraService.active$.subscribe((wrapper: ICameraWrapper | undefined): void => void (camera = wrapper));
  loopService.tick$.subscribe(({ delta }: ILoopTimes): void => spaceLoop(delta, camera, renderer, activeScene, text2dRegistry, text3dRegistry, text2dRenderer, text3dRenderer, controlsRegistry));

  const destroyable: IDestroyable = destroyableMixin();
  const builtMixin: IWithBuilt = withBuiltMixin();

  destroyable.destroyed$.subscribe(() => {
    builtMixin.built$.complete();
    Object.values(services).forEach((service): void => void (isDestroyable(service) && service.destroy()));
    loopService.stop();
    loopService.destroy();
  });

  builtMixin.build();

  return {
    name,
    start(): void {
      loopService.start();
    },
    stop(): void {
      // TODO (S.Panfilov) implement stop
      // if (isDefined(intersectionsWatcher)) intersectionsWatcher.stop();
      // loop.stop(renderer, activeScene, controlsRegistry, cameraRegistry);
    },
    services,
    ...builtMixin,
    built$: builtMixin.built$.asObservable(),
    ...destroyable,
    ...withTagsMixin(tags)
  };
}
