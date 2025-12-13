import type { Color } from 'three/src/math/Color';

import type { TAbstractLightProps } from './TAbstractLightProps';

export type THemisphereLightProps = Omit<TAbstractLightProps, 'color'> &
  Readonly<{
    color: Color;
    groundColor: Color;
    intensity?: number;
  }>;
