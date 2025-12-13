import type { LightType } from '@Anarchy/Engine/Light/Constants';
import type { TWithName, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TObject3DParams } from '@Anarchy/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@Anarchy/Engine/TransformDrive';
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
