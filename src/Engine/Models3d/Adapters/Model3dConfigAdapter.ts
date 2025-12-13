import type { TMaterialWrapper } from '@/Engine/Material';
import type { TModel3dComplexConfig, TModel3dComplexParams, TModel3dConfigToParamsDependencies, TModel3dPrimitiveConfig, TModel3dPrimitiveParams } from '@/Engine/Models3d/Models';
import { isPrimitive } from '@/Engine/Models3d/Utils';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TModel3dComplexConfig | TModel3dPrimitiveConfig, { materialService }: TModel3dConfigToParamsDependencies): TModel3dComplexParams | TModel3dPrimitiveParams {
  const { position, rotation, material: materialConfig, scale, ...rest } = config;

  if (isPrimitive(config) && isNotDefined(materialConfig)) throw new Error(`Model3dConfigAdapter: Material must be defined for primitive model, but it is not.`);
  const material = (isDefined(materialConfig) ? materialService.getMaterialWithOverrides(materialConfig) : undefined) as TMaterialWrapper;

  return {
    ...rest,
    material,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}

export function model3dConfigComplexToParams(config: TModel3dComplexConfig, deps: TModel3dConfigToParamsDependencies): TModel3dComplexParams {
  return configToParams(config, deps) as TModel3dComplexParams;
}

export function model3dConfigPrimitiveToParams(config: TModel3dPrimitiveConfig, deps: TModel3dConfigToParamsDependencies): TModel3dPrimitiveParams {
  return configToParams(config, deps) as TModel3dPrimitiveParams;
}
