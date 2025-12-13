import type { Color } from 'three';

import type { TWithName, TWithTags } from '@/Mixins';

export type TFogParams = Readonly<{
  color: Color;
  near?: number;
  far?: number;
}> &
  TWithName &
  TWithTags;
