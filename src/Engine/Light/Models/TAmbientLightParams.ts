import type { Color } from 'three/src/math/Color';

import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TAbstractLightParams } from './TAbstractLightParams';

export type TAmbientLightParams = TAbstractLightParams &
  Readonly<{
    color: Color;
    intensity?: number;
  }> &
  TObject3DParams &
  TWithReadonlyTags;
