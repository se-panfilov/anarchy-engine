import type { TObject3DParams, TObject3DPropConfig } from '@Engine/ThreeLib';

import type { TParticlesParams } from './TParticlesParams';

export type TParticlesConfig = Omit<TParticlesParams, keyof TObject3DParams | 'material'> &
  Readonly<{
    material: string;
  }> &
  TObject3DPropConfig;
