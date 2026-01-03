import type { TWithName, TWithTags } from '@Anarchy/Engine/Mixins';
import type { Color } from 'three';

export type TLoadingManagerParams = Readonly<{
  color: Color;
  near?: number;
  far?: number;
}> &
  TWithName &
  TWithTags;
