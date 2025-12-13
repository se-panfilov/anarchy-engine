import type { TMaterialWrapper } from '@/Engine/Material';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TParticlesConfig, TParticlesConfigToParamsDependencies, TParticlesWrapper } from '@/Engine/Particles/Models';
import { filterOutEmptyFields, isNotDefined } from '@/Engine/Utils';

export function particlesToConfig(entity: TParticlesWrapper, { materialRegistry }: TParticlesConfigToParamsDependencies): TParticlesConfig {
  const { drive } = entity;

  const materialW: TMaterialWrapper | undefined = materialRegistry.find((materialW: TMaterialWrapper): boolean => materialW.entity === entity.entity.material);
  if (isNotDefined(materialW)) throw new Error(`[Serialization] Particles: material not found for entity with name: "${entity.name}", (id: "${entity.id}")`);
  const material: string | undefined = materialW.name;

  return filterOutEmptyFields({
    material,
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
}
