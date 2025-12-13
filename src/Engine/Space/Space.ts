import type { TAppCanvas } from '@/Engine/App';
import { ambientContext } from '@/Engine/Context';
import type { TAddedTexturePack } from '@/Engine/EnvMap';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins/Generics';
import { mouseService } from '@/Engine/Mouse';
import { RendererModes } from '@/Engine/Renderer';
import type { TScenesService, TSceneWrapper } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import { withBuiltMixin } from '@/Engine/Space/Mixins';
import type { TSpace, TSpaceConfig, TSpaceServices, TWithBuilt } from '@/Engine/Space/Models';
import { initServices } from '@/Engine/Space/SpaceHelpers';
import { isDefined, isDestroyable, isNotDefined, validLevelConfig } from '@/Engine/Utils';

// TODO (S.Panfilov) SPACE: we need a space service, and factory, to create from config, and to create from the code.

// TODO (S.Panfilov) LOGGER: add a logger globally (not only for errors, but I'd like to know, which service with which id did what).
export function buildSpaceFromConfig(canvas: TAppCanvas, config: TSpaceConfig): TSpace {
  const { isValid, errors } = validLevelConfig(config);
  if (!isValid) {
    // TODO (S.Panfilov) LOGGER: should be forwarded to the errors hub (which is not implemented yet)
    console.error(errors);
    throw new Error('Failed to launch a space: invalid data format');
  }

  const { name, actors, cameras, intersections, lights, fogs, texts, envMaps, controls, scenes, particles, physics, tags } = config;

  screenService.setCanvas(canvas);

  let activeScene: TSceneWrapper;
  const services: TSpaceServices = initServices(canvas, (scenesService: TScenesService): TSceneWrapper | never => {
    scenesService.createFromConfig(scenes);
    const scene: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(scene)) throw new Error(`Cannot find an active scene for space "${name}" during space's services initialization.`);
    activeScene = scene;
    return activeScene;
  });

  const { actorService, cameraService, controlsService, lightService, fogService, envMapService, textService, rendererService, intersectionsWatcherService, particlesService, physicsService } =
    services;

  if (isDefined(physics.global)) physicsService.createWorld(physics.global);
  if (isDefined(physics.presets)) physicsService.addPresetsFromConfig(physics.presets);

  cameraService.createFromConfig(cameras);
  actorService.createFromConfig(actors);

  textService.createText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService.createText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService.createFromConfig(texts);

  controlsService.createFromConfig(controls, cameraService.getRegistry());
  lightService.createFromConfig(lights);

  fogService.createFromConfig(fogs);
  particlesService.createFromConfig(particles);

  envMapService.added$.subscribe(({ texture }: TAddedTexturePack): void => {
    activeScene.setBackground(texture);
    activeScene.setEnvironmentMap(texture);
  });

  void envMapService.loadFromConfigAsync(envMaps);

  rendererService.create({ canvas, tags: [], mode: RendererModes.WebGL2, isActive: true });

  //build intersections
  void intersectionsWatcherService.createFromConfigAsync(intersections, mouseService, cameraService, actorService);

  intersectionsWatcherService.getRegistry().added$.subscribe((watcher: TIntersectionsWatcher): void => {
    if (watcher.isAutoStart && !watcher.isStarted) watcher.start();
  });

  const destroyable: TDestroyable = destroyableMixin();
  const builtMixin: TWithBuilt = withBuiltMixin();

  destroyable.destroyed$.subscribe(() => {
    builtMixin.built$.complete();
    Object.values(services).forEach((service): void => void (isDestroyable(service) && service.destroy()));
  });

  builtMixin.build();

  return {
    name,
    services,
    ...builtMixin,
    built$: builtMixin.built$.asObservable(),
    ...destroyable,
    ...withTagsMixin(tags)
  };
}
