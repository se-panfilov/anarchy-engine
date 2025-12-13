import type { TFsmWrapper } from '@/Engine';
import type { TActor, TActorConfig, TActorConfigToParamsDependencies, TActorStates } from '@/Engine/Actor/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TModel3d, TModels3dRegistry } from '@/Engine/Models3d';
import type { TSpatialDataConfig } from '@/Engine/Spatial';
import { filterOutEmptyFields, isNotDefined } from '@/Engine/Utils';

// TODO 15-0-0: (finish 14-0-0 tasks)

// TODO 15-0-0: validate result
export function actorToConfig(entity: TActor, { models3dService }: TActorConfigToParamsDependencies): TActorConfig {
  const { drive } = entity;
  console.log('XXX entity', entity);

  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const model3d: TModel3d | undefined = models3dRegistry.findById(entity.model3d.id);
  if (isNotDefined(model3d)) throw new Error(`[Serialization] Actor: model3d not found for entity with name: "${entity.name}", (id: "${entity.id}")`);
  const model3dSource: string = model3d.name;

  return filterOutEmptyFields({
    // driveUpdateDelay //needs a getter (maybe at TransformDrive)
    //   driveCoordsThreshold?: number;  //needs a getter (maybe at TransformDrive)

    //   model3dSettings?: TActorModel3dSettings;

    model3dSource,
    // physics?: TWithPresetNamePhysicsBodyConfig,
    // kinematic?: TKinematicConfig,
    spatial: getSpatial(entity),
    // collisions?: TCollisionsDataConfig,
    // model3dSettings?: TActorModel3dSettingsConfig,
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
