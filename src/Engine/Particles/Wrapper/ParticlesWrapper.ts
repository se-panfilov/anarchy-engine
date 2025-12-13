import { Particles } from 'three';

import type { IWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IParticles, IParticlesParams, IParticlesWrapper } from '@/Engine/Particles/Models';

export function ParticlesWrapper(params: IParticlesParams): IParticlesWrapper {
  const entity: IParticles = new Particles(params.color, params.near, params.far);

  const wrapper: IWrapper<IParticles> = AbstractWrapper(entity, WrapperType.Particles, params);

  function destroy(): void {
    // TODO (S.Panfilov) implement destroy
    throw new Error('Particles destroy not implemented');
  }

  return { ...wrapper, entity, destroy };
}
