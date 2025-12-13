import type { TMaterialWrapper } from '@/Engine/Material';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TParticlesConfig, TParticlesConfigToParamsDependencies, TParticlesWrapper } from '@/Engine/Particles/Models';
import { filterOutEmptyFields, isNotDefined } from '@/Engine/Utils';

// TODO 15-0-0: validate result
export function particlesToConfig(entity: TParticlesWrapper, { materialRegistry }: TParticlesConfigToParamsDependencies): TParticlesConfig {
  const { drive } = entity;

  const material: TMaterialWrapper | undefined = materialRegistry.find((materialW: TMaterialWrapper): boolean => materialW.entity === entity.entity.material);
  if (isNotDefined(material)) throw new Error(`[Serialization] Particles: materialSource not found for entity with name: "${entity.name}", (id: "${entity.id}")`);
  const materialSource: string | undefined = material.name;

  return filterOutEmptyFields({
    materialSource,
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
}
