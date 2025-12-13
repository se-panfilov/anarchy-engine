import type { Color } from 'three';

import type { TWithNameOptional } from '@/Engine/Mixins';

export type TFogProps = Readonly<{
  color: Color;
  near?: number;
  far?: number;
}> &
  TWithNameOptional;
