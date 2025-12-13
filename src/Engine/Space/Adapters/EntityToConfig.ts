import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TSpace, TSpaceConfig, TSpaceConfigEntities, TSpaceServices } from '@/Engine/Space/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

// TODO 15-0-0: validate result
// TODO 15-0-0: Space can be created in a runtime, so "entities" field could contain something (when create from config, it's empty)
export function spaceToConfig(
  entity: TSpace,
  {
    actorService,
    spatialGridService,
    audioService,
    cameraService,
    envMapService,
    intersectionsWatcherService,
    lightService,
    models3dService,
    rendererService,
    particlesService,
    physicsPresetService,
    fogService,
    fsmService,
    textService,
    controlsService
  }: TSpaceServices
): TSpaceConfig {
  console.log('XXX entity', entity);

  const entities: TSpaceConfigEntities = {
    spatialGrids: spatialGridService.serializeAllEntities(),
    actors: actorService.serializeAllEntities(),
    audio: audioService.serializeAllEntities(),
    cameras: cameraService.serializeAllEntities(),
    envMaps: envMapService.serializeAllEntities(),
    intersections: intersectionsWatcherService.serializeAllEntities(),
    lights: lightService.serializeAllEntities(),
    models3d: models3dService.serializeAllEntities(),
    renderers: rendererService.serializeAllEntities(),
    particles: particlesService.serializeAllEntities(),
    physics: {
      // global: physicsWorldService.serializeAllEntities(),
      presets: physicsPresetService.serializeAllEntities()
    },
    fogs: fogService.serializeAllEntities(),
    fsm: fsmService.serializeAllEntities(),
    texts: textService.serializeAllEntities(),
    controls: controlsService.serializeAllEntities()

    // TODO 15-0-0: fix any
    // ...entity.entities.reduce((acc: TSpaceConfigEntities, entity): TSpaceConfigEntities => {
    //   const { id, type } = entity;
    //   acc[id] = {
    //     id,
    //     type,
    //     // TODO 15-0-0: fix any
    //     ...entity.serialize()
    //   };
    //   return acc;
    // }, {})
  };

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    canvasSelector: entity.getCanvasSelector(),
    version: entity.version,
    entities,
    // TODO 15-0-0: implement
    //     resources: TSpaceConfigResources;
    // scenes: entity.scenes,
    ...extractSerializableRegistrableFields(entity)
  }) as any;
}
