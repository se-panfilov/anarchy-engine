import type { Color } from 'three/src/math/Color';

import type { IAbstractLightProps } from './IAbstractLightProps';

export type IAmbientLightProps = IAbstractLightProps &
  Readonly<{
    color: Color;
    intensity?: number;
  }>;
