import type { Color } from 'three/src/math/Color';

import type { TAbstractLightProps } from './TAbstractLightProps';

export type TDirectionalLightProps = TAbstractLightProps &
  Readonly<{
    color: Color;
    intensity?: number;
    castShadow?: boolean;
  }>;
