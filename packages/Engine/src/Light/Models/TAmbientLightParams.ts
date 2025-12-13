import type { Color } from 'three/src/math/Color';

import type { TAbstractLightParams } from './TAbstractLightParams';

export type TAmbientLightParams = TAbstractLightParams &
  Readonly<{
    color: Color;
    intensity?: number;
  }>;
