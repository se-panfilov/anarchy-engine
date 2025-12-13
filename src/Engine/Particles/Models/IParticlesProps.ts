import type { Color } from 'three';

import type { IWithName } from '@/Engine/Mixins';

export type IParticlesProps = Readonly<{
  color: Color;
  near?: number;
  far?: number;
}> &
  IWithName;
