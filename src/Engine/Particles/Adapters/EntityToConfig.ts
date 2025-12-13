import type { TMaterialWrapper } from '@/Engine/Material';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TParticlesConfig, TParticlesConfigToParamsDependencies, TParticlesWrapper } from '@/Engine/Particles/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function particlesToConfig(entity: TParticlesWrapper, { materialRegistry }: TParticlesConfigToParamsDependencies): TParticlesConfig {
  const { drive } = entity;

  const materialW: TMaterialWrapper = materialRegistry.get((materialW: TMaterialWrapper): boolean => materialW.entity === entity.entity.material);

  return filterOutEmptyFields({
    material: materialW.name,
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
}
