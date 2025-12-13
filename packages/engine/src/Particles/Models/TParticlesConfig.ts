import type { TObject3DParams, TObject3DPropConfig } from '@/ThreeLib';

import type { TParticlesParams } from './TParticlesParams';

export type TParticlesConfig = Omit<TParticlesParams, keyof TObject3DParams | 'material'> &
  Readonly<{
    material: string;
  }> &
  TObject3DPropConfig;
