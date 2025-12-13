import { configToParams as materialConfigToParams } from '@/Engine/Material/Adapter';
import type { IMaterialPackParams, IMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { IParticlesConfig, IParticlesParams } from '@/Engine/Particles/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';

export function configToParams(config: IParticlesConfig): IParticlesParams {
  const { position, rotation, layers, animations, scale, material, ...rest } = config;
  const { type: materialType, ...restMaterialParams } = materialConfigToParams({ ...material.params, type: material.type });

  return {
    ...rest,
    material: { type: materialType, params: { ...restMaterialParams }, textures: material.textures } satisfies IMaterialPackParams<IMaterialTexturePack>,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}
