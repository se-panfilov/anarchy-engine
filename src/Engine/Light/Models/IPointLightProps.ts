import type { Color } from 'three/src/math/Color';

import type { IAbstractLightProps } from './IAbstractLightProps';

export type IPointLightProps = IAbstractLightProps &
  Readonly<{
    color: Color;
    intensity?: number;
    distance?: number;
    decay?: number;
  }>;
