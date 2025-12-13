import type { World } from '@dimforge/rapier3d';

import type { TAppCanvas } from '@/Engine/App';
import { ambientContext } from '@/Engine/Context';
import type { TAddedTexturePack } from '@/Engine/EnvMap';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins/Generics';
import { RendererModes } from '@/Engine/Renderer';
import type { TScenesService, TSceneWrapper } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import { withBuiltMixin } from '@/Engine/Space/Mixins';
import type { TSpace, TSpaceConfig, TSpaceServices, TWithBuilt } from '@/Engine/Space/Models';
import { initServices } from '@/Engine/Space/Utils';
import { validSpaceConfig } from '@/Engine/Space/Validators';
import { isDefined, isDestroyable, isNotDefined } from '@/Engine/Utils';

// TODO SPACE: we need a space service, and factory, to create from config, and to create from the code.

// TODO LOGGER: add a logger globally (not only for errors, but I'd like to know, which service with which id did what).
export async function buildSpaceFromConfig(canvas: TAppCanvas, config: TSpaceConfig): Promise<TSpace> {
  const { isValid, errors } = validSpaceConfig(config);
  if (!isValid) {
    // TODO LOGGER: should be forwarded to the errors hub (which is not implemented yet)
    console.error(errors);
    throw new Error('Failed to launch a space: invalid data format');
  }

  const { name, entities, resources, scenes, tags } = config;
  const { models3d, envMaps } = resources;
  const { actors, cameras, spatialGrids, controls, intersections, lights, fogs, texts, physics, particles } = entities;
  screenService.setCanvas(canvas);

  let activeSceneW: TSceneWrapper;
  const services: TSpaceServices = initServices(canvas, (scenesService: TScenesService): TSceneWrapper | never => {
    scenesService.createFromConfig(scenes);
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error(`Cannot find an active scene for space "${name}" during space's services initialization.`);
    activeSceneW = sceneW;

    // TODO debug (window as any).sceneW
    // (window as any).sceneW = sceneW;

    return activeSceneW;
  });

  const {
    actorService,
    cameraService,
    controlsService,
    envMapService,
    fogService,
    intersectionsWatcherService,
    lightService,
    models3dService,
    mouseService,
    particlesService,
    physicsLoopService,
    physicsPresetService,
    physicsWorldService,
    rendererService,
    spatialGridService,
    textService
  } = services;

  if (isDefined(physics.global)) {
    const world: World = physicsWorldService.createWorld(physics.global);
    physicsLoopService.shouldAutoUpdate((isDefined(world) && physics.isAutoUpdate) ?? true);
  }
  if (isDefined(physics.presets)) physicsPresetService.addPresetsFromConfig(physics.presets);

  // TODO CWP !!!
  // TODO MODELS: all materials should be load and waited before the models are created.
  //let materialParams: TMaterialPackParams<TMaterialTexturePack> | undefined;
  //   if (isDefined(material)) {
  //     const { type: materialType, ...restMaterialParams } = materialConfigToParams({ ...material.params, type: material.type });
  //     materialParams = { type: materialType, params: { ...restMaterialParams }, textures: material.textures } satisfies TMaterialPackParams<TMaterialTexturePack>;
  //   }
  //
  //   if (isPrimitive(config) && isNotDefined(materialParams)) throw new Error(`Model3dConfigAdapter: Material must be defined for primitive model, but it is not.`);

  await Promise.all(models3dService.createFromConfigAsync(models3d));

  cameraService.createFromConfig(cameras);
  actorService.createFromConfig(actors);

  textService.createText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService.createText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService.createFromConfig(texts);

  controlsService.createFromConfig(controls, cameraService.getRegistry());
  lightService.createFromConfig(lights);

  fogService.createFromConfig(fogs);
  spatialGridService.createFromConfig(spatialGrids);
  particlesService.createFromConfig(particles);

  envMapService.added$.subscribe(({ texture }: TAddedTexturePack): void => {
    activeSceneW.setBackground(texture);
    activeSceneW.setEnvironmentMap(texture);
  });

  void envMapService.loadFromConfigAsync(envMaps);

  rendererService.create({ canvas, tags: [], mode: RendererModes.WebGL2, isActive: true });

  //build intersections
  intersectionsWatcherService.createFromConfig(intersections, mouseService, cameraService, actorService);

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
