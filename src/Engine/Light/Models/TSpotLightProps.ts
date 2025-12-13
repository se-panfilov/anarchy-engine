import type { Color } from 'three/src/math/Color';

import type { TAbstractLightProps } from './TAbstractLightProps';

export type TSpotLightProps = TAbstractLightProps &
  Readonly<{
    color: Color;
    intensity?: number;
    distance?: number;
    angle?: number;
    penumbra?: number;
    decay?: number;
    castShadow?: boolean;
  }>;
