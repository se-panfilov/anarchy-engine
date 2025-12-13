import type { Color } from 'three/src/math/Color';

import type { TAbstractLightProps } from './TAbstractLightProps';
import type { TDirectionalLightShadowParams } from './TDirectionalLightShadowParams';

export type TDirectionalLightProps = Omit<TAbstractLightProps, 'shadow'> &
  Readonly<{
    color: Color;
    intensity?: number;
    shadow?: TDirectionalLightShadowParams;
    castShadow?: boolean;
  }>;
