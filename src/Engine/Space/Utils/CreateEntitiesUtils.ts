import type { World } from '@dimforge/rapier3d';

import type { TRegistryPack } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { TSpaceConfigEntities, TSpaceServices } from '@/Engine/Space/Models';
import { isDefined } from '@/Engine/Utils';

// TODO SPACE: Maybe we need a space service, and factory, to create from config, and to create from the code.
export function createEntities(entities: TSpaceConfigEntities, services: TSpaceServices): void {
  const { actors, cameras, spatialGrids, controls, intersections, lights, models3d, envMaps, fogs, texts, physics, particles } = entities;

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
    spatialGridService,
    textService
  } = services;

  fogService.createFromConfig(fogs);

  envMapService.createFromConfig(envMaps);

  models3dService.createFromConfig(models3d);

  if (isDefined(physics.global)) {
    const world: World = physicsWorldService.createWorld(physics.global);
    physicsLoopService.autoUpdate$.next((isDefined(world) && physics.isAutoUpdate) ?? true);
  }
  if (isDefined(physics.presets)) physicsPresetService.addPresetsFromConfig(physics.presets);

  cameraService.createFromConfig(cameras);
  actorService.createFromConfig(actors);

  textService.createText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService.createText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService.createFromConfig(texts);

  controlsService.createFromConfig(controls, cameraService.getRegistry());
  lightService.createFromConfig(lights);

  spatialGridService.createFromConfig(spatialGrids);
  particlesService.createFromConfig(particles);

  intersectionsWatcherService.createFromConfig(intersections, mouseService, cameraService, actorService);

  // TODO Not the best place for this, perhaps better to do it in a wrapper (or service?)
  intersectionsWatcherService.getRegistry().added$.subscribe(({ value }: TRegistryPack<TIntersectionsWatcher>): void => {
    if (value.isAutoStart && !value.isStarted) value.start();
  });
}
