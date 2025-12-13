import type { TActorConfig, TActorConfigToParamsDependencies, TActorParams } from '@/Engine/Actor/Models';
import { kinematicConfigToParams } from '@/Engine/Kinematic';
import type { TModel3d } from '@/Engine/Models3d';
import { configToOptionalParamsBody } from '@/Engine/Physics';
import { configToParamsSpatialData } from '@/Engine/Spatial';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TActorConfig, dependencies: TActorConfigToParamsDependencies): TActorParams {
  const { position, rotation, scale, physics, spatial, model3dSource, kinematic, ...rest } = config;

  const model3d: TModel3d | undefined = dependencies.models3dService.getRegistry().findByName(model3dSource);
  if (isNotDefined(model3d)) throw new Error(`Actor. ConfigToParams: Model3d "${model3dSource}" not found, while actor initialization`);

  // TODO Improvement: Physics could be extracted from Actor to a distinct entity (and we should have physicsSource in Actor)
  return {
    ...rest,
    model3dSource: model3d,
    spatial: configToParamsSpatialData(spatial, dependencies),
    physics: physics ? configToOptionalParamsBody(physics) : undefined,
    kinematic: kinematic ? kinematicConfigToParams(kinematic) : undefined,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}
