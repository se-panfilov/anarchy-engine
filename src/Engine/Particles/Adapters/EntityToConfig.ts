import type { TParticlesConfig, TParticlesWrapper } from '@/Engine/Particles/Models';

export function entityToConfig(entity: TParticlesWrapper): TParticlesConfig {
  const { drive } = entity;
  // TODO 15-0-0: implement

  return {
    ...drive.serialize()
  };
}
