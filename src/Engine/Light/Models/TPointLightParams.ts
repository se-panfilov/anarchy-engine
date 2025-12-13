import type { Color } from 'three/src/math/Color';

import type { TWithTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TAbstractLightParams } from './TAbstractLightParams';

export type TPointLightParams = TAbstractLightParams &
  Readonly<{
    color: Color;
    intensity?: number;
    distance?: number;
    decay?: number;
    castShadow?: boolean;
  }> &
  TObject3DParams &
  TWithTags;
