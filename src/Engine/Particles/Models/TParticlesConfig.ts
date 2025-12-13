import type { TObject3DParams, TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TParticlesParams } from './TParticlesParams';

export type TParticlesConfig = Omit<TParticlesParams, keyof TObject3DParams | 'materialSource'> &
  Readonly<{
    materialSource: string;
  }> &
  TObject3DPropConfig;
