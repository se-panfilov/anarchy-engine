import type { TAnyMaterialWrapper } from '@Anarchy/Engine/Material';
import type { TParticlesConfig, TParticlesConfigToParamsDependencies, TParticlesParams } from '@Anarchy/Engine/Particles/Models';
import { configToParamsObject3d } from '@Anarchy/Engine/ThreeLib';

export function configToParams(config: TParticlesConfig, { materialRegistry }: TParticlesConfigToParamsDependencies): TParticlesParams | never {
  const { position, rotation, layers, scale, ...rest } = config;
  const material: TAnyMaterialWrapper = materialRegistry.getByName(config.material);

  return {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers }),
    material
  };
}
