import type { TMaterialWrapper } from '@/Engine/Material';
import type { TModel3dConfig, TModel3dConfigToParamsDependencies, TModel3dParams } from '@/Engine/Models3d/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: TModel3dConfig, { materialService }: TModel3dConfigToParamsDependencies): TModel3dParams {
  const { position, rotation, material: materialName, scale, ...rest } = config;

  const material: TMaterialWrapper | undefined = isDefined(materialName) ? materialService.getRegistry().findByName(materialName) : undefined;

  return {
    ...rest,
    material,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}
