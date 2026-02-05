import { actorStatesConfigToParams, model3dSettingsConfigToParams } from '@hellpig/anarchy-engine/Actor/Adapters/Helpers';
import type { TActorConfig, TActorConfigToParamsDependencies, TActorParams } from '@hellpig/anarchy-engine/Actor/Models';
import { kinematicConfigToParams } from '@hellpig/anarchy-engine/Kinematic';
import type { TModel3d } from '@hellpig/anarchy-engine/Models3d';
import { spatialDataConfigToParams } from '@hellpig/anarchy-engine/Spatial';
import { object3dConfigToParams } from '@hellpig/anarchy-engine/ThreeLib';
import { isDefined } from '@hellpig/anarchy-shared/Utils';

export function actorConfigToParams(config: TActorConfig, dependencies: TActorConfigToParamsDependencies): TActorParams {
  const { position, rotation, scale, physicsBodyName, spatial, states, model3dSource, kinematic, model3dSettings, ...rest } = config;

  const model3d: TModel3d = dependencies.models3dService.getRegistry().getByName(model3dSource);

  return {
    ...rest,
    kinematic: kinematic ? kinematicConfigToParams(kinematic) : undefined,
    model3dSettings: model3dSettings ? model3dSettingsConfigToParams(model3dSettings) : undefined,
    model3dSource: model3d,
    physicsBody: isDefined(physicsBodyName) ? dependencies.physicsBodyService.getRegistry().getByName(physicsBodyName) : undefined,
    spatial: spatialDataConfigToParams(spatial, dependencies),
    states: states ? actorStatesConfigToParams(states, dependencies) : undefined,
    ...object3dConfigToParams({ position, rotation, scale })
  };
}
