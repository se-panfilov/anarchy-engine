import type { World } from '@dimforge/rapier3d';
import type { Subscription } from 'rxjs';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { ambientContext } from '@/Engine/Context';
import type { TEnvMapTexture, TEnvMapWrapper } from '@/Engine/EnvMap';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { TModel3dFacade } from '@/Engine/Models3d/Models';
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

// TODO CWP !!!
// TODO 9.0.0. RESOURCES: fix create method of resource entities
export function watchResourcesAndCreateResourceEntities(services: TSpaceServices): ReadonlyArray<Subscription> {
  const models3dSub$: Subscription = services.models3dService.getResourceRegistry().added$.subscribe((model: GLTF): TModel3dFacade => services.models3dService.create(model));
  const envMaps3dSub$: Subscription = services.envMapService.getResourceRegistry().added$.subscribe((envMap: TEnvMapTexture): TEnvMapWrapper => services.envMapService.create(envMap));
  return [models3dSub$, envMaps3dSub$];
}
