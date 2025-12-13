import { configToParams as materialConfigToParams } from '@/Engine/Material/Adapters';
import type { TMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TModel3dConfig, TModel3dParams, TModel3dPrimitiveConfig, TModel3dPrimitiveParams } from '@/Engine/Models3d/Models';
import { isPrimitive } from '@/Engine/Models3d/Services/Models3dServiceHelper';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function model3dConfigToParams(config: TModel3dConfig | TModel3dPrimitiveConfig): TModel3dParams | TModel3dPrimitiveParams {
  const { position, rotation, material, scale, ...rest } = config;

  let materialParams: TMaterialPackParams<TMaterialTexturePack> | undefined;
  if (isDefined(material)) {
    const { type: materialType, ...restMaterialParams } = materialConfigToParams({ ...material.params, type: material.type });
    materialParams = { type: materialType, params: { ...restMaterialParams }, textures: material.textures } satisfies TMaterialPackParams<TMaterialTexturePack>;
  }

  if (isPrimitive(config) && isNotDefined(materialParams)) throw new Error(`Model3dConfigAdapter: Material must be defined for primitive model, but it is not.`);

  return {
    ...rest,
    material: materialParams as TMaterialPackParams<TMaterialTexturePack>,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}
