import type { Color } from 'three/src/math/Color';

import type { IAbstractLightProps } from './IAbstractLightProps';

export type IHemisphereLightProps = Omit<IAbstractLightProps, 'color'> &
  Readonly<{
    color: Color;
    groundColor: Color;
    intensity?: number;
  }>;
