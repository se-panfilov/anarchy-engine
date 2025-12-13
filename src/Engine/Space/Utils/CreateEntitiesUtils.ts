import type { TRegistryPack } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { TSpaceConfigEntities, TSpaceServices } from '@/Engine/Space/Models';
import { isDefined } from '@/Engine/Utils';

export function createEntitiesFromConfig(entities: TSpaceConfigEntities, services: TSpaceServices): void {
  const { actors, audio, cameras, spatialGrids, controls, intersections, lights, models3d, envMaps, fogs, fsm, texts, physics, particles } = entities;

  const {
    actorService,
    audioService,
    cameraService,
    controlsService,
    envMapService,
    fogService,
    fsmService,
    intersectionsWatcherService,
    lightService,
    loopService,
    models3dService,
    mouseService,
    particlesService,
    physicsPresetService,
    physicsWorldService,
    spatialGridService,
    textService
  } = services;

  // better to create FSMs before any other entities
  fsmService.createSourceFromConfig(fsm);

  //spatial grids should be created before actors
  spatialGridService.createFromConfig(spatialGrids);
  fogService.createFromConfig(fogs);
  envMapService.createFromConfig(envMaps);
  models3dService.createFromConfig(models3d);
  audioService.createFromConfig(audio);

  if (isDefined(physics.global)) physicsWorldService.createWorld(physics.global);
  if (isDefined(physics.presets)) physicsPresetService.addPresetsFromConfig(physics.presets);

  cameraService.createFromConfig(cameras);
  actorService.createFromConfig(actors);

  textService.createText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService.createText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService.createFromConfig(texts);

  controlsService.createFromConfig(controls, cameraService.getRegistry());
  lightService.createFromConfig(lights);
  particlesService.createFromConfig(particles);

  intersectionsWatcherService.createFromConfig(intersections, mouseService, cameraService, actorService, loopService);

  // TODO Not the best place for this, perhaps better to do it in a wrapper (or service?)
  intersectionsWatcherService.getRegistry().added$.subscribe(({ value }: TRegistryPack<TIntersectionsWatcher>): void => {
    if (value.isAutoStart && !value.isStarted) value.start$.next();
  });
}
