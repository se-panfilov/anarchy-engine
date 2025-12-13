import type { Color } from 'three/src/math/Color';

import type { TWithTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TAbstractLightParams } from './TAbstractLightParams';

export type THemisphereLightParams = TAbstractLightParams &
  Readonly<{
    groundColor: Color;
  }> &
  TObject3DParams &
  TWithTags;
