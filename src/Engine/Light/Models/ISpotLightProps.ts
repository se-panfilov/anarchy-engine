import type { Color } from 'three/src/math/Color';

import type { IAbstractLightProps } from './IAbstractLightProps';

export type ISpotLightProps = IAbstractLightProps &
  Readonly<{
    color: Color;
    intensity?: number;
    distance?: number;
    angle?: number;
    penumbra?: number;
    decay?: number;
    castShadow?: boolean;
  }>;
