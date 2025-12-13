import type { TAnyMaterialWrapper } from '@/Material';
import { extractSerializableRegistrableFields } from '@/Mixins';
import type { TParticlesConfig, TParticlesConfigToParamsDependencies, TParticlesWrapper } from '@/Particles/Models';
import { filterOutEmptyFields } from '@/Utils';

export function particlesToConfig(entity: TParticlesWrapper, { materialRegistry }: TParticlesConfigToParamsDependencies): TParticlesConfig {
  const { drive } = entity;

  const materialW: TAnyMaterialWrapper = materialRegistry.get((materialW: TAnyMaterialWrapper): boolean => materialW.entity === entity.entity.material);

  return filterOutEmptyFields({
    material: materialW.name,
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
}
