import type { Color } from 'three';

import type { TWithNameOptional, TWithTags } from '@/Engine/Mixins';

export type TFogParams = Readonly<{
  color: Color;
  near?: number;
  far?: number;
}> &
  TWithNameOptional &
  TWithTags;
