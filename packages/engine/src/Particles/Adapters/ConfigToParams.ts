import type { TAnyMaterialWrapper } from '@/Material';
import type { TParticlesConfig, TParticlesConfigToParamsDependencies, TParticlesParams } from '@/Particles/Models';
import { configToParamsObject3d } from '@/ThreeLib';

export function configToParams(config: TParticlesConfig, { materialRegistry }: TParticlesConfigToParamsDependencies): TParticlesParams | never {
  const { position, rotation, layers, scale, ...rest } = config;
  const material: TAnyMaterialWrapper = materialRegistry.getByName(config.material);

  return {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers }),
    material
  };
}
