import type { IVector3 } from '@Engine/Wrappers';
import type { Color } from 'three/src/math/Color';

import type { CommonTag } from '@/Engine/Domains/Abstract';
import type { LightTag } from '@/Engine/Domains/Light/Constants';

import type { ILightShadowParams } from './ILightShadowParams';
import type { ILightType } from './ILightType';

export type ILightParams = Readonly<{
  type: ILightType;
  color: Color;
  intensity?: number;
  position: IVector3;
  castShadow: boolean;
  shadow?: ILightShadowParams;
  tags: ReadonlyArray<LightTag | CommonTag | string>;
}>;
