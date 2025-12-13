import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TParticlesConfig, TParticlesWrapper } from '@/Engine/Particles/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function particlesToConfig(entity: TParticlesWrapper): TParticlesConfig {
  const { drive } = entity;
  // TODO 15-0-0: implement
  const json = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
    // TODO 15-0-0: fix any
  }) as any;
}
