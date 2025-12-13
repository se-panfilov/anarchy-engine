import type { Color } from 'three';

import type { IWithName } from '@/Engine/Mixins';

export type IFogProps = Readonly<{
  color: Color;
  near?: number;
  far?: number;
}> &
  IWithName;
