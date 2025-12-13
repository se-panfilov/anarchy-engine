import type { TRegistryPack } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import { CreateEntitiesStrategy } from '@/Engine/Space/Constants';
import type { TSpaceConfigEntities, TSpaceParamsEntities, TSpaceServices } from '@/Engine/Space/Models';
import { isDefined } from '@/Engine/Utils';

export function createEntities(entities: TSpaceConfigEntities | TSpaceParamsEntities, services: TSpaceServices, strategy: CreateEntitiesStrategy): void | never {
  switch (strategy) {
    case CreateEntitiesStrategy.Config:
      createEntitiesFromConfigs(entities as TSpaceConfigEntities, services);
      break;
    case CreateEntitiesStrategy.Params:
      createEntitiesFromParams(entities as TSpaceParamsEntities, services);
      break;
    default:
      throw new Error(`Space: Unknown entities creation strategy: ${strategy}`);
  }

  // TODO Not the best place for this, perhaps better to do it in a wrapper (or service?)
  services.intersectionsWatcherService.getRegistry().added$.subscribe(({ value }: TRegistryPack<TIntersectionsWatcher>): void => {
    if (value.isAutoStart && !value.isStarted) value.start$.next();
  });
}

// TODO a lot of code duplication here, but doesn't worth to refactor right now
export function createEntitiesFromConfigs(entities: TSpaceConfigEntities, services: TSpaceServices): void {
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
}

export function createEntitiesFromParams(entities: TSpaceParamsEntities, services: TSpaceServices): void {
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
    models3dService,
    particlesService,
    physicsPresetService,
    physicsWorldService,
    spatialGridService,
    textService
  } = services;

  // better to create FSMs before any other entities
  if (isDefined(fsm)) fsmService.createSourceFromList(fsm);

  //spatial grids should be created before actors
  if (isDefined(spatialGrids)) spatialGridService.createFromList(spatialGrids);
  if (isDefined(fogs)) fogService.createFromList(fogs);
  if (isDefined(envMaps)) envMapService.createFromList(envMaps);
  if (isDefined(models3d)) models3dService.createFromList(models3d);
  if (isDefined(audio)) audioService.createFromList(audio);

  if (isDefined(physics?.global)) physicsWorldService.createWorld(physics.global);
  if (isDefined(physics?.presets)) physicsPresetService.addPresets(physics.presets);

  if (isDefined(cameras)) cameraService.createFromList(cameras);
  if (isDefined(actors)) actorService.createFromList(actors);

  textService.createText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService.createText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  if (isDefined(texts)) textService.createFromList(texts);

  if (isDefined(controls)) controlsService.createFromList(controls);
  if (isDefined(lights)) lightService.createFromList(lights);
  if (isDefined(particles)) particlesService.createFromList(particles);

  if (isDefined(intersections)) intersectionsWatcherService.createFromList(intersections);
}
