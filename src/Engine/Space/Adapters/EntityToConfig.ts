import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { SpaceSchemaVersion } from '@/Engine/Space/Constants';
import type { TSpace, TSpaceConfig, TSpaceConfigEntities, TSpaceConfigResources, TSpaceServices } from '@/Engine/Space/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

// TODO 15-0-0: validate result
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
    physicsPresetService,
    rendererService,
    spatialGridService,
    textService,
    scenesService,
    textureService
  }: TSpaceServices
): TSpaceConfig {
  console.log('XXX entity space', entity);

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
    models3d: models3dService.serializeAllEntities(),
    particles: particlesService.serializeAllEntities(),
    physics: {
      // global: physicsWorldService.serializeAllEntities(),
      presets: physicsPresetService.serializeAllEntities()
    },
    renderers: rendererService.serializeAllEntities(),
    spatialGrids: spatialGridService.serializeAllEntities(),
    texts: textService.serializeAllEntities()
  };

  const resources: TSpaceConfigResources = {
    animations: animationsService.serializeAllResources(),
    audio: audioService.serializeAllResources(),
    envMaps: envMapService.serializeAllResources(),
    // TODO 15-0-0: serializeAllEntities() or serializeAllResources() here?
    materials: materialService.serializeAllEntities(),
    models3d: models3dService.serializeAllResources(),
    textures: textureService.serializeAllResources()
  };

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    canvasSelector: entity.getCanvasSelector(),
    version: entity.version as SpaceSchemaVersion,
    entities,
    resources,
    scenes: scenesService.serializeAllEntities(),
    ...extractSerializableRegistrableFields(entity)
  });
}
