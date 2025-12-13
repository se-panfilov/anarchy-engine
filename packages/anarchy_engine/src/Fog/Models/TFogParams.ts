import type { TWithName, TWithTags } from '@Engine/Mixins';
import type { Color } from 'three';

export type TFogParams = Readonly<{
  color: Color;
  near?: number;
  far?: number;
}> &
  TWithName &
  TWithTags;
