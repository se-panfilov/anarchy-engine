import type { TActorConfig, TActorParams } from '@/Engine/Actor/Models';
import { configToParams as materialConfigToParams } from '@/Engine/Material/Adapters';
import type { IMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import { configToParamsObject3d } from '@/Engine/ThreeLib';

export function configToParams(config: TActorConfig): TActorParams {
  const { position, rotation, layers, animations, scale, material, ...rest } = config;
  const { type: materialType, ...restMaterialParams } = materialConfigToParams({ ...material.params, type: material.type });

  return {
    ...rest,
    material: { type: materialType, params: { ...restMaterialParams }, textures: material.textures } satisfies IMaterialPackParams<TMaterialTexturePack>,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}
