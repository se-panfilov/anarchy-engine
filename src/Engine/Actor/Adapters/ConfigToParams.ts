import { actorStatesConfigToParams, model3dSettingsConfigToParams } from '@/Engine/Actor/Adapters/Helpers';
import type { TActorConfig, TActorConfigToParamsDependencies, TActorParams } from '@/Engine/Actor/Models';
import { kinematicConfigToParams } from '@/Engine/Kinematic';
import type { TModel3d } from '@/Engine/Models3d';
import { configToParamsSpatialData } from '@/Engine/Spatial';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: TActorConfig, dependencies: TActorConfigToParamsDependencies): TActorParams {
  const { position, rotation, scale, physicBodyName, spatial, states, model3dSource, kinematic, model3dSettings, ...rest } = config;

  const model3d: TModel3d = dependencies.models3dService.getRegistry().getByName(model3dSource);

  return {
    ...rest,
    kinematic: kinematic ? kinematicConfigToParams(kinematic) : undefined,
    model3dSettings: model3dSettings ? model3dSettingsConfigToParams(model3dSettings) : undefined,
    model3dSource: model3d,
    physicBody: isDefined(physicBodyName) ? dependencies.physicsBodyService.getRegistry().getByName(physicBodyName) : undefined,
    spatial: configToParamsSpatialData(spatial, dependencies),
    states: states ? actorStatesConfigToParams(states, dependencies) : undefined,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}
