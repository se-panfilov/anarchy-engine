import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TSpace, TSpaceConfig, TSpaceConfigEntities, TSpaceServices } from '@/Engine/Space/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

// TODO 15-0-0: validate result
// TODO 15-0-0: Space can be created in a runtime, so "entities" field could contain something (when create from config, it's empty)
export function spaceToConfig(entity: TSpace, { actorService }: TSpaceServices): TSpaceConfig {
  console.log('XXX entity', entity);

  const entities: TSpaceConfigEntities = {
    //   spatialGrids: ReadonlyArray<TSpatialGridConfig>;
    //   actors: ReadonlyArray<TActorConfig>;
    //   audio: ReadonlyArray<TAnyAudioConfig>;
    //   cameras: ReadonlyArray<TCameraConfig>;
    //   envMaps: ReadonlyArray<TEnvMapConfig>;
    //   intersections: ReadonlyArray<TIntersectionsWatcherConfig>;
    //   lights: ReadonlyArray<TAnyLightConfig>;
    //   models3d: ReadonlyArray<TModel3dConfig>;
    //   renderers: ReadonlyArray<TRendererConfig>;
    //   particles: ReadonlyArray<TParticlesConfig>;
    //   physics: TPhysicsConfig;
    //   fogs: ReadonlyArray<TFogConfig>;
    //   fsm: ReadonlyArray<TFsmConfig>;
    //   texts: ReadonlyArray<TTextConfig>;
    //   controls: ReadonlyArray<TControlsConfig>;
    // actors: actorService.serializeAllEntities()
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
