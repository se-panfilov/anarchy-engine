import type { Color } from 'three';

import type { TAbstractLightParams } from './TAbstractLightParams';

export type THemisphereLightParams = TAbstractLightParams &
  Readonly<{
    groundColor: Color;
  }>;
