import type { Color } from 'three/src/math/Color';

import type { LightType } from '@/Engine/Light/Constants';
import type { TWithNameOptional, TWithTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

import type { TLightShadowParams } from './TLightShadowParams';

export type TAbstractLightParams = Readonly<{
  type: LightType;
  color: Color;
  intensity?: number;
  shadow?: TLightShadowParams;
}> &
  TWithTransformAgentParam &
  TWithNameOptional &
  TObject3DParams &
  TWithTags;
