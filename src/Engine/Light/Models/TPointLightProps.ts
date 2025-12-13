import type { Color } from 'three/src/math/Color';

import type { TAbstractLightProps } from './TAbstractLightProps';

export type TPointLightProps = TAbstractLightProps &
  Readonly<{
    color: Color;
    intensity?: number;
    distance?: number;
    decay?: number;
    castShadow?: boolean;
  }>;
