import type { World } from '@dimforge/rapier3d';

import { ambientContext } from '@/Engine/Context';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { TSpaceConfigEntities, TSpaceServices } from '@/Engine/Space/Models';
import { isDefined } from '@/Engine/Utils';

// TODO SPACE: Maybe we need a space service, and factory, to create from config, and to create from the code.
export function createEntities(entities: TSpaceConfigEntities, services: TSpaceServices): void {
  const { actors, cameras, spatialGrids, controls, intersections, lights, fogs, texts, physics, particles } = entities;

  const {
    actorService,
    cameraService,
    controlsService,
    fogService,
    intersectionsWatcherService,
    lightService,
    mouseService,
    particlesService,
    physicsLoopService,
    physicsPresetService,
    physicsWorldService,
    spatialGridService,
    textService
  } = services;

  if (isDefined(physics.global)) {
    const world: World = physicsWorldService.createWorld(physics.global);
    physicsLoopService.shouldAutoUpdate((isDefined(world) && physics.isAutoUpdate) ?? true);
  }
  if (isDefined(physics.presets)) physicsPresetService.addPresetsFromConfig(physics.presets);

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

  intersectionsWatcherService.createFromConfig(intersections, mouseService, cameraService, actorService);

  // TODO Not the best place for this, perhaps better to do it in a wrapper (or service?)
  intersectionsWatcherService.getRegistry().added$.subscribe((watcher: TIntersectionsWatcher): void => {
    if (watcher.isAutoStart && !watcher.isStarted) watcher.start();
  });
}
