import type { Color } from 'three/src/math/Color';

import type { LightType } from '@/Engine/Light/Constants';

import type { ILightShadowParams } from './ILightShadowParams';

export type IAbstractLightProps = Readonly<{
  type: LightType;
  color: Color;
  intensity?: number;
  shadow?: ILightShadowParams;
}>;
