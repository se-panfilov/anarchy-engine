import type { Color } from 'three/src/math/Color';

import type { IAbstractLightProps } from './IAbstractLightProps';

export type IRectAreaLightProps = IAbstractLightProps &
  Readonly<{
    color: Color;
    intensity?: number;
    width: number;
    height: number;
  }>;
