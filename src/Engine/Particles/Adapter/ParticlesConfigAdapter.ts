import type { IParticlesConfig, IParticlesParams } from '@/Engine/Particles/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';

export function configToParams(config: IParticlesConfig): IParticlesParams {
  const { position, rotation, layers, animations, scale, ...rest } = config;

  return {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}
