import type { LightType } from '@hellpig/anarchy-engine/Light/Constants';
import type { TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';
import type { TObject3DParams } from '@hellpig/anarchy-engine/ThreeLib';
import type { TWithTransformAgentParam } from '@hellpig/anarchy-engine/TransformDrive';
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
