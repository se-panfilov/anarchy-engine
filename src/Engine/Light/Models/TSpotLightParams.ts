import type { Color } from 'three/src/math/Color';

import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TAbstractLightParams } from './TAbstractLightParams';

export type TSpotLightParams = TAbstractLightParams &
  Readonly<{
    color: Color;
    intensity?: number;
    distance?: number;
    angle?: number;
    penumbra?: number;
    decay?: number;
    castShadow?: boolean;
  }> &
  TObject3DParams &
  TWithReadonlyTags;
