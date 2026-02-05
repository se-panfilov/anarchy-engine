import type { TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';
import type { Color } from 'three';

export type TFogParams = Readonly<{
  color: Color;
  near?: number;
  far?: number;
}> &
  TWithName &
  TWithTags;
