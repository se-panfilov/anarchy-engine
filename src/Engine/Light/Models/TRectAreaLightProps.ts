import type { Color } from 'three/src/math/Color';

import type { TAbstractLightProps } from './TAbstractLightProps';

export type TRectAreaLightProps = TAbstractLightProps &
  Readonly<{
    color: Color;
    intensity?: number;
    width: number;
    height: number;
  }>;
