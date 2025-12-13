import type { Color } from 'three/src/math/Color';

import type { LightType } from '@/Light/Constants';
import type { TWithName, TWithTags } from '@/Mixins';
import type { TObject3DParams } from '@/ThreeLib';
import type { TWithTransformAgentParam } from '@/TransformDrive';

import type { TLightShadowParams } from './TLightShadowParams';

export type TAbstractLightParams = Readonly<{
  type: LightType;
  color: Color;
  intensity?: number;
  shadow?: TLightShadowParams;
}> &
  TWithTransformAgentParam &
  TWithName &
  TObject3DParams &
  TWithTags;
