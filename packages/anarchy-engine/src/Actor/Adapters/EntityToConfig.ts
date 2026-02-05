import type { TActor, TActorConfig, TActorEntityToConfigDependencies, TActorStates } from '@hellpig/anarchy-engine/Actor/Models';
import type { TCollisionsDataConfig } from '@hellpig/anarchy-engine/Collisions';
import type { TFsmConfig, TFsmWrapper } from '@hellpig/anarchy-engine/Fsm';
import { extractSerializableRegistrableFields } from '@hellpig/anarchy-engine/Mixins';
import type { TModel3d, TModels3dRegistry } from '@hellpig/anarchy-engine/Models3d';
import type { TSpatialDataConfig } from '@hellpig/anarchy-engine/Spatial';
import { filterOutEmptyFields, isNotDefined } from '@hellpig/anarchy-shared/Utils';

export function actorEntityToConfig(entity: TActor, { models3dService }: TActorEntityToConfigDependencies): TActorConfig {
  const { drive } = entity;

  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const model3d: TModel3d | undefined = models3dRegistry.getById(entity.model3d.id);
  const model3dSource: string = model3d.name;

  return filterOutEmptyFields({
    model3dSource,
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

  Object.entries(entity.states).forEach((entry: [string, TFsmWrapper]): void => {
    const [key, state] = entry;
    const serialized: TFsmConfig = state.serialize();
    const { name, currentState, strategy } = serialized;
    result = { ...result, [key]: { name, currentState, strategy } };
  });

  return result;
}

function getCollisions(entity: TActor): TCollisionsDataConfig | undefined {
  if (isNotDefined(entity.collisions) || isNotDefined(entity.collisions.data)) return undefined;

  const { updatePriority } = entity.collisions.data;

  return { isAutoUpdate: entity.collisions.autoUpdate$.value, updatePriority };
}
