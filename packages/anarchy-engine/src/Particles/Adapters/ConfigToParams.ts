import type { TAnyMaterialWrapper } from '@hellpig/anarchy-engine/Material';
import type { TParticlesConfig, TParticlesConfigToParamsDependencies, TParticlesParams } from '@hellpig/anarchy-engine/Particles/Models';
import { object3dConfigToParams } from '@hellpig/anarchy-engine/ThreeLib';

export function particlesConfigToParams(config: TParticlesConfig, { materialRegistry }: TParticlesConfigToParamsDependencies): TParticlesParams | never {
  const { position, rotation, layers, scale, ...rest } = config;
  const material: TAnyMaterialWrapper = materialRegistry.getByName(config.material);

  return {
    ...rest,
    ...object3dConfigToParams({ position, rotation, scale, layers }),
    material
  };
}
