import type { Color } from 'three';

import type { IWithName } from '@/Engine/Mixins';

export type TFogProps = Readonly<{
  color: Color;
  near?: number;
  far?: number;
}> &
  IWithName;
