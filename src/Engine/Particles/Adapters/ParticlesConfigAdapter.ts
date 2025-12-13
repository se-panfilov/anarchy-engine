import type { TMaterialWrapper } from '@/Engine/Material';
import type { TParticlesConfig, TParticlesConfigToParamsDependencies, TParticlesParams } from '@/Engine/Particles/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TParticlesConfig, { materialService }: TParticlesConfigToParamsDependencies): TParticlesParams | never {
  const { position, rotation, layers, scale, material: materialConfig, ...rest } = config;

  const material: TMaterialWrapper | undefined = materialService.getMaterialWithOverrides(materialConfig);
  if (isNotDefined(material)) throw new Error('Failed to create a particle: material is not defined');

  return {
    ...rest,
    material,
    ...configToParamsObject3d({ position, rotation, scale, layers })
  };
}
