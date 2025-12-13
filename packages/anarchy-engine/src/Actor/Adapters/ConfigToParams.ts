import { actorStatesConfigToParams, model3dSettingsConfigToParams } from '@Anarchy/Engine/Actor/Adapters/Helpers';
import type { TActorConfig, TActorConfigToParamsDependencies, TActorParams } from '@Anarchy/Engine/Actor/Models';
import { kinematicConfigToParams } from '@Anarchy/Engine/Kinematic';
import type { TModel3d } from '@Anarchy/Engine/Models3d';
import { configToParamsSpatialData } from '@Anarchy/Engine/Spatial';
import { configToParamsObject3d } from '@Anarchy/Engine/ThreeLib';
import { isDefined } from '@Anarchy/Shared/Utils';

export function configToParams(config: TActorConfig, dependencies: TActorConfigToParamsDependencies): TActorParams {
  const { position, rotation, scale, physicsBodyName, spatial, states, model3dSource, kinematic, model3dSettings, ...rest } = config;

  const model3d: TModel3d = dependencies.models3dService.getRegistry().getByName(model3dSource);

  return {
    ...rest,
    kinematic: kinematic ? kinematicConfigToParams(kinematic) : undefined,
    model3dSettings: model3dSettings ? model3dSettingsConfigToParams(model3dSettings) : undefined,
    model3dSource: model3d,
    physicsBody: isDefined(physicsBodyName) ? dependencies.physicsBodyService.getRegistry().getByName(physicsBodyName) : undefined,
    spatial: configToParamsSpatialData(spatial, dependencies),
    states: states ? actorStatesConfigToParams(states, dependencies) : undefined,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}
