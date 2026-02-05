import type { TAnyMaterialWrapper } from '@hellpig/anarchy-engine/Material';
import { extractSerializableRegistrableFields } from '@hellpig/anarchy-engine/Mixins';
import type { TParticlesConfig, TParticlesConfigToParamsDependencies, TParticlesWrapper } from '@hellpig/anarchy-engine/Particles/Models';
import { filterOutEmptyFields } from '@hellpig/anarchy-shared/Utils';

export function particlesEntityToConfig(entity: TParticlesWrapper, { materialRegistry }: TParticlesConfigToParamsDependencies): TParticlesConfig {
  const { drive } = entity;

  const materialW: TAnyMaterialWrapper = materialRegistry.get((materialW: TAnyMaterialWrapper): boolean => materialW.entity === entity.entity.material);

  return filterOutEmptyFields({
    material: materialW.name,
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
}
