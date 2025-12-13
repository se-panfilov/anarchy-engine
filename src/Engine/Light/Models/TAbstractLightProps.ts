import type { Color } from 'three/src/math/Color';

import type { LightType } from '@/Engine/Light/Constants';
import type { TWithNameOptional } from '@/Engine/Mixins';

import type { TLightShadowParams } from './TLightShadowParams';

export type TAbstractLightProps = Readonly<{
  type: LightType;
  color: Color;
  intensity?: number;
  shadow?: TLightShadowParams;
}> &
  TWithNameOptional;
