import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TParticlesProps } from './TParticlesProps';

export type TParticlesConfig = Omit<TParticlesProps, 'materialSource'> &
  Readonly<{
    materialSource: string;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
