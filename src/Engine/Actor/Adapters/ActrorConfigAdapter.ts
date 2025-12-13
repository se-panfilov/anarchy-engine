import type { IActorConfig, IActorParams } from '@/Engine/Actor/Models';
import { configToParams as materialConfigToParams } from 'src/Engine/Material/Adapters';
import type { IMaterialPackParams, IMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import { configToParamsObject3d } from '@/Engine/ThreeLib';

export function configToParams(config: IActorConfig): IActorParams {
  const { position, rotation, layers, animations, scale, material, ...rest } = config;
  const { type: materialType, ...restMaterialParams } = materialConfigToParams({ ...material.params, type: material.type });

  return {
    ...rest,
    material: { type: materialType, params: { ...restMaterialParams }, textures: material.textures } satisfies IMaterialPackParams<IMaterialTexturePack>,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}
