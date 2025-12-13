import { configToParams as materialConfigToParams } from '@/Engine/Material/Adapter';
import type { IParticlesConfig, IParticlesParams } from '@/Engine/Particles/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';

export function configToParams(config: IParticlesConfig): IParticlesParams {
  const { position, rotation, layers, animations, scale, material, ...rest } = config;

  return {
    ...rest,
    material: materialConfigToParams({ ...material.params, type: material.type }),
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}
