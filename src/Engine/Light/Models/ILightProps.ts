import type { Color } from 'three/src/math/Color';

import type { ILightShadowParams } from './ILightShadowParams';
import type { ILightType } from './ILightType';

export type ILightProps = Readonly<{
  type: ILightType;
  color: Color;
  intensity?: number;
  castShadow: boolean;
  distance?: number;
  decay?: number;
  shadow?: ILightShadowParams;
}>;
