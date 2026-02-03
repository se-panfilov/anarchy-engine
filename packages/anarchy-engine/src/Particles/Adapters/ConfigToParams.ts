import type { TAnyMaterialWrapper } from '@Anarchy/Engine/Material';
import type { TParticlesConfig, TParticlesConfigToParamsDependencies, TParticlesParams } from '@Anarchy/Engine/Particles/Models';
import { object3dConfigToParams } from '@Anarchy/Engine/ThreeLib';

export function particlesConfigToParams(config: TParticlesConfig, { materialRegistry }: TParticlesConfigToParamsDependencies): TParticlesParams | never {
  const { position, rotation, layers, scale, ...rest } = config;
  const material: TAnyMaterialWrapper = materialRegistry.getByName(config.material);

  return {
    ...rest,
    ...object3dConfigToParams({ position, rotation, scale, layers }),
    material
  };
}
