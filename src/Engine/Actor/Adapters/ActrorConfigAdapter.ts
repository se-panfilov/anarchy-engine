import type { TActorConfig, TActorConfigToParamsDependencies, TActorParams } from '@/Engine/Actor/Models';
import { configToOptionalParamsBody } from '@/Engine/Physics';
import { configToParamsSpatialData } from '@/Engine/Spatial';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TActorConfig, dependencies: TActorConfigToParamsDependencies): TActorParams {
  const { position, rotation, scale, physics, spatial, model3dName, ...rest } = config;

  const model3d = isDefined(model3dName) ? dependencies.models3dRegistry.findByName(model3dName) : undefined;
  if (isNotDefined(model3d)) throw new Error(`Actor. ConfigToParams: Model3d "${model3dName}" not found, while actor initialization`);

  return {
    ...rest,
    model3d,
    spatial: configToParamsSpatialData(spatial, dependencies),
    physics: physics ? configToOptionalParamsBody(physics) : undefined,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}
