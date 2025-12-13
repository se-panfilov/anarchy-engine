import { extractRegistrableFields } from '@/Engine/Mixins';
import type { TParticlesConfig, TParticlesWrapper } from '@/Engine/Particles/Models';

export function particlesToConfig(entity: TParticlesWrapper): TParticlesConfig {
  const { drive } = entity;
  // TODO 15-0-0: implement

  return {
    ...extractRegistrableFields(entity),
    ...drive.serialize()
    // TODO 15-0-0: fix any
  } as any;
}
