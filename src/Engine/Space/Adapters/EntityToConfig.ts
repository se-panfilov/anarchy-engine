import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { SpaceSchemaVersion } from '@/Engine/Space/Constants';
import type { TSpace, TSpaceConfig, TSpaceConfigEntities, TSpaceConfigResources, TSpaceServices } from '@/Engine/Space/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

// TODO 15-0-0: Space can be created in a runtime, so "entities" field could contain something (when create from config, it's empty)
export function spaceToConfig(
  entity: TSpace,
  {
    actorService,
    animationsService,
    audioService,
    cameraService,
    controlsService,
    envMapService,
    fogService,
    fsmService,
    intersectionsWatcherService,
    lightService,
    materialService,
    models3dService,
    particlesService,
    physicsBodyService,
    physicsWorldService,
    rendererService,
    scenesService,
    spatialGridService,
    textService,
    textureService
  }: TSpaceServices
): TSpaceConfig {
  const entities: TSpaceConfigEntities = {
    actors: actorService.serializeAllEntities(),
    audio: audioService.serializeAllEntities(),
    cameras: cameraService.serializeAllEntities(),
    controls: controlsService.serializeAllEntities(),
    envMaps: envMapService.serializeAllEntities(),
    fogs: fogService.serializeAllEntities(),
    fsm: fsmService.serializeAllEntities(),
    intersections: intersectionsWatcherService.serializeAllEntities(),
    lights: lightService.serializeAllEntities(),
    materials: materialService.serializeAllEntities(),
    models3d: models3dService.serializeAllEntities(),
    particles: particlesService.serializeAllEntities(),
    physics: {
      global: physicsWorldService.serializeWorld(),
      bodies: physicsBodyService.serializeAllEntities()
    },
    renderers: rendererService.serializeAllEntities(),
    spatialGrids: spatialGridService.serializeAllEntities(),
    texts: textService.serializeAllEntities()
  };

  const resources: TSpaceConfigResources = {
    animations: animationsService.serializeAllResources(),
    audio: audioService.serializeAllResources(),
    envMaps: envMapService.serializeAllResources(),
    models3d: models3dService.serializeAllResources(),
    textures: textureService.serializeAllResources()
  };

  return filterOutEmptyFields({
    canvasSelector: entity.getCanvasSelector(),
    version: entity.version as SpaceSchemaVersion,
    entities,
    resources,
    scenes: scenesService.serializeAllEntities(),
    ...extractSerializableRegistrableFields(entity)
  });
}
