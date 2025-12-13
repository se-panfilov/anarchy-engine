import type { Color } from 'three';

import type { TWithNameOptional, TWithReadonlyTags } from '@/Engine/Mixins';

export type TFogParams = Readonly<{
  color: Color;
  near?: number;
  far?: number;
}> &
  TWithNameOptional &
  TWithReadonlyTags;
