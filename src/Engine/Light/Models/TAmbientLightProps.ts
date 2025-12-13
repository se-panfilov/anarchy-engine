import type { Color } from 'three/src/math/Color';

import type { TAbstractLightProps } from './TAbstractLightProps';

export type TAmbientLightProps = TAbstractLightProps &
  Readonly<{
    color: Color;
    intensity?: number;
  }>;
