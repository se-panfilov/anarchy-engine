import type { TRegistryPack } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { TCreateEntitiesStrategy, TSpaceConfigEntities, TSpaceParamsEntities, TSpaceServices } from '@/Engine/Space/Models';
import { isDefined } from '@/Engine/Utils';

export function createEntities(entities: TSpaceConfigEntities | TSpaceParamsEntities, services: TSpaceServices, strategy: TCreateEntitiesStrategy): void {
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
  fsmService[strategy.fsm](fsm);

  //spatial grids should be created before actors
  if (isDefined(spatialGrids)) spatialGridService[strategy.spatialGrids](spatialGrids);
  fogService[strategy.fogs](fogs);
  envMapService[strategy.envMaps](envMaps);
  models3dService[strategy.models3d](models3d);
  audioService[strategy.audio](audio);

  if (isDefined(physics?.global)) physicsWorldService.createWorld(physics.global);
  if (isDefined(physics?.presets)) physicsPresetService[strategy.physicsPresets](physics.presets);

  cameraService[strategy.cameras](cameras);
  actorService[strategy.actors](actors);

  textService.createText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService.createText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService[strategy.texts](texts);

  controlsService[strategy.controls](controls, cameraService.getRegistry());
  lightService[strategy.lights](lights);
  particlesService[strategy.particles](particles);

  intersectionsWatcherService[strategy.intersections](intersections, mouseService, cameraService, actorService, loopService);

  // TODO Not the best place for this, perhaps better to do it in a wrapper (or service?)
  intersectionsWatcherService.getRegistry().added$.subscribe(({ value }: TRegistryPack<TIntersectionsWatcher>): void => {
    if (value.isAutoStart && !value.isStarted) value.start$.next();
  });
}
