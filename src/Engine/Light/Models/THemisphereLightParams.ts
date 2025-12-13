import type { Color } from 'three/src/math/Color';

import type { TWithTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TAbstractLightParams } from './TAbstractLightParams';

export type THemisphereLightParams = Omit<TAbstractLightParams, 'color'> &
  Readonly<{
    color: Color;
    groundColor: Color;
    intensity?: number;
  }> &
  TObject3DParams &
  TWithTags;
