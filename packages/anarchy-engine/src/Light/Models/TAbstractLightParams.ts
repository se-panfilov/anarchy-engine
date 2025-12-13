import type { LightType } from '@Engine/Light/Constants';
import type { TWithName, TWithTags } from '@Engine/Mixins';
import type { TObject3DParams } from '@Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@Engine/TransformDrive';
import type { Color } from 'three';

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
