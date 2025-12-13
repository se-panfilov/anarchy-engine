import { actorStatesConfigToParams, model3dSettingsConfigToParams } from '@/Engine/Actor/Adapters/Helpers';
import type { TActorConfig, TActorConfigToParamsDependencies, TActorParams } from '@/Engine/Actor/Models';
import type { TModel3d } from '@/Engine/Models3d';
import { configToOptionalParamsBody } from '@/Engine/Physics';
import { configToParamsSpatialData } from '@/Engine/Spatial';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TActorConfig, dependencies: TActorConfigToParamsDependencies): TActorParams {
  const { position, rotation, scale, physics, spatial, states, model3dSource, model3dSettings, ...rest } = config;

  const model3d: TModel3d | undefined = dependencies.models3dService.getRegistry().findByName(model3dSource);
  if (isNotDefined(model3d)) throw new Error(`Actor. ConfigToParams: Model3d "${model3dSource}" not found, during the actor initialization`);

  // TODO Improvement: Physics could be extracted from Actor to a distinct entity (and we should have physicsSource in Actor)
  return {
    ...rest,
    model3dSource: model3d,
    spatial: configToParamsSpatialData(spatial, dependencies),
    physics: physics ? configToOptionalParamsBody(physics) : undefined,
    model3dSettings: model3dSettings ? model3dSettingsConfigToParams(model3dSettings) : undefined,
    states: states ? actorStatesConfigToParams(states, dependencies) : undefined,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}
