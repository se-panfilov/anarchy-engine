import type { TActorConfig, TActorConfigToParamsDependencies, TActorParams } from '@/Engine/Actor/Models';
import { configToOptionalParamsBody } from '@/Engine/Physics';
import { configToParamsSpatialData } from '@/Engine/Spatial';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TActorConfig, dependencies: TActorConfigToParamsDependencies): TActorParams {
  const { position, rotation, scale, physics, spatial, model3d: model3dConfig, ...rest } = config;
  const { presetName, ...restModel3d } = model3dConfig;

  const model3d = isDefined(presetName) ? dependencies.models3dService.findModel3dAndOverride(presetName, restModel3d) : undefined;
  if (isNotDefined(model3d)) throw new Error(`Actor. ConfigToParams: Model3d "${presetName}" not found, while actor initialization`);

  return {
    ...rest,
    model3d,
    spatial: configToParamsSpatialData(spatial, dependencies),
    physics: physics ? configToOptionalParamsBody(physics) : undefined,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}
