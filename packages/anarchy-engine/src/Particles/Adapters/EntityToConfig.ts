import type { TAnyMaterialWrapper } from '@Anarchy/Engine/Material';
import { extractSerializableRegistrableFields } from '@Anarchy/Engine/Mixins';
import type { TParticlesConfig, TParticlesConfigToParamsDependencies, TParticlesWrapper } from '@Anarchy/Engine/Particles/Models';
import { filterOutEmptyFields } from '@Shared/Utils';

export function particlesToConfig(entity: TParticlesWrapper, { materialRegistry }: TParticlesConfigToParamsDependencies): TParticlesConfig {
  const { drive } = entity;

  const materialW: TAnyMaterialWrapper = materialRegistry.get((materialW: TAnyMaterialWrapper): boolean => materialW.entity === entity.entity.material);

  return filterOutEmptyFields({
    material: materialW.name,
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
}
