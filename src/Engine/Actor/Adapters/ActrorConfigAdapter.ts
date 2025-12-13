import type { TActorConfig, TActorConfigToParamsDependencies, TActorParams } from '@/Engine/Actor/Models';
import { configToOptionalParamsBody } from '@/Engine/Physics';
import { configToParamsSpatialData } from '@/Engine/Spatial';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TActorConfig, dependencies: TActorConfigToParamsDependencies): TActorParams {
  const { position, rotation, scale, physics, spatial, model3d: model3dName, ...rest } = config;

  const model3d = dependencies.models3dService.getRegistry().findByName(model3dName);
  if (isNotDefined(model3d)) throw new Error(`Actor. ConfigToParams: Model3d "${model3d}" not found, while actor initialization`);

  return {
    ...rest,
    model3d,
    spatial: configToParamsSpatialData(spatial, dependencies),
    physics: physics ? configToOptionalParamsBody(physics) : undefined,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}
