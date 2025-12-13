import type { Color } from 'three/src/math/Color';

import type { TAbstractLightParams } from './TAbstractLightParams';

export type THemisphereLightParams = TAbstractLightParams &
  Readonly<{
    groundColor: Color;
  }>;
