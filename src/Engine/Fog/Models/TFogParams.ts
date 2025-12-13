import type { Color } from 'three';

import type { TWithName, TWithTags } from '@/Engine/Mixins';

export type TFogParams = Readonly<{
  color: Color;
  near?: number;
  far?: number;
}> &
  TWithName &
  TWithTags;
