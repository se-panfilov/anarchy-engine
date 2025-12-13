import type { Color } from 'three/src/math/Color';

import type { IAbstractLightProps } from './IAbstractLightProps';

export type IHemisphereLightProps = IAbstractLightProps &
  Readonly<{
    skyColor: Color;
    groundColor: Color;
    intensity?: number;
  }>;
