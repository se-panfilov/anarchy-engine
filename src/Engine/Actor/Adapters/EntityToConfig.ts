import type { TActor, TActorConfig, TActorEntityToConfigDependencies, TActorStates } from '@/Engine/Actor/Models';
import type { TCollisionsDataConfig } from '@/Engine/Collisions';
import type { TFsmWrapper } from '@/Engine/Fsm';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TModel3d, TModels3dRegistry } from '@/Engine/Models3d';
import type { TSpatialDataConfig } from '@/Engine/Spatial';
import { filterOutEmptyFields, isNotDefined } from '@/Engine/Utils';

// TODO 15-0-0: (finish 14-0-0 tasks)

// TODO 15-0-0: validate result
export function actorToConfig(entity: TActor, { models3dService }: TActorEntityToConfigDependencies): TActorConfig {
  const { drive } = entity;
  console.log('XXX entity', entity);

  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const model3d: TModel3d | undefined = models3dRegistry.findById(entity.model3d.id);
  if (isNotDefined(model3d)) throw new Error(`[Serialization] Actor: model3d not found for entity with name: "${entity.name}", (id: "${entity.id}")`);
  const model3dSource: string = model3d.name;

  return filterOutEmptyFields({
    model3dSource,
    // physics?: TWithPresetNamePhysicsBodyConfig,
    // kinematic?: TKinematicConfig,
    spatial: getSpatial(entity),
    collisions: getCollisions(entity),
    model3dSettings: entity.getModel3dSettings(),
    states: getStates(entity),

    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
}

function getSpatial(entity: TActor): TSpatialDataConfig {
  const { grid, updatePriority } = entity.spatial.data;
  if (isNotDefined(grid)) throw new Error(`[Serialization] Actor: spatial grid not found for entity with name: "${entity.name}", (id: "${entity.id}")`);
  return { isAutoUpdate: entity.spatial.autoUpdate$.value, grid: grid.name, updatePriority };
}

function getStates(entity: TActor): TActorStates {
  let result: TActorStates = {};

  Object.entries(entity.states).forEach((state: [string, TFsmWrapper]): void => {
    const [key, value] = state;
    result = { ...result, [key]: value.name };
  });

  return result;
}

function getCollisions(entity: TActor): TCollisionsDataConfig | undefined {
  if (isNotDefined(entity.collisions) || isNotDefined(entity.collisions.data)) return undefined;

  const { updatePriority } = entity.collisions.data;

  return { isAutoUpdate: entity.collisions.autoUpdate$.value, updatePriority };
}
