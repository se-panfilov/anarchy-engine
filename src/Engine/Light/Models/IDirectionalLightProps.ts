import type { Color } from 'three/src/math/Color';

import type { IAbstractLightProps } from './IAbstractLightProps';

export type IDirectionalLightProps = IAbstractLightProps &
  Readonly<{
    color: Color;
    intensity?: number;
    castShadow?: boolean;
  }>;
