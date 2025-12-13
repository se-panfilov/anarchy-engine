import type { Color } from 'three';

import type { TWithName } from '@/Engine/Mixins';

export type TFogProps = Readonly<{
  color: Color;
  near?: number;
  far?: number;
}> &
  TWithName;
