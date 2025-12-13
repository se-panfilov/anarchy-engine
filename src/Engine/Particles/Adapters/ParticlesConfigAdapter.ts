import { configToParams as materialConfigToParams } from '@/Engine/Material/Adapters';
import type { TMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TParticlesConfig, TParticlesParams } from '@/Engine/Particles/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';

export function configToParams(config: TParticlesConfig): TParticlesParams {
  const { position, rotation, layers, scale, material, ...rest } = config;
  const { type: materialType, ...restMaterialParams } = materialConfigToParams({ ...material.params, type: material.type });

  return {
    ...rest,
    material: { type: materialType, params: { ...restMaterialParams }, textures: material.textures } satisfies TMaterialPackParams<TMaterialTexturePack>,
    ...configToParamsObject3d({ position, rotation, scale, layers })
  };
}
