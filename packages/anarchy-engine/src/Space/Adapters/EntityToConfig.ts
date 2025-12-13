import { extractSerializableRegistrableFields } from '@Anarchy/Engine/Mixins';
import type { SpaceSchemaVersion } from '@Anarchy/Engine/Space/Constants';
import type { TSpace, TSpaceConfig, TSpaceConfigEntities, TSpaceConfigResources, TSpaceServices } from '@Anarchy/Engine/Space/Models';
import { filterOutEmptyFieldsRecursive, isDefined } from '@Anarchy/Shared/Utils';

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
    physics: isDefined(entity.services.physicsWorldService.findWorld())
      ? {
          world: physicsWorldService.serializeWorld(),
          bodies: physicsBodyService.serializeAllEntities()
        }
      : {},
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

  return filterOutEmptyFieldsRecursive({
    canvasSelector: entity.getCanvasSelector(),
    version: entity.version as SpaceSchemaVersion,
    entities,
    resources,
    scenes: scenesService.serializeAllEntities(),
    ...extractSerializableRegistrableFields(entity)
  });
}
