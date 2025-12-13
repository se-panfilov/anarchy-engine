import type { Color } from 'three';

import type { TAbstractLightParams } from './TAbstractLightParams';

export type TAmbientLightParams = TAbstractLightParams &
  Readonly<{
    color: Color;
    intensity?: number;
  }>;
