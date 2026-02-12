import type { TKinematicParams } from '@Anarchy/Engine/Kinematic';
import type { TWithName, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TPhysicsBody } from '@Anarchy/Engine/Physics';
import type { TextType } from '@Anarchy/Engine/Text/Constants';
import type { TObject3DParams } from '@Anarchy/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@Anarchy/Engine/TransformDrive';
import type { Vector2 } from 'three';

import type { TTextCssProps } from './TTextCssProps';

export type TTextParams = Readonly<{
  center?: Vector2;
  cssProps?: TTextCssProps;
  elementType?: string;
  kinematic?: TKinematicParams;
  physicsBody?: TPhysicsBody;
  text?: string;
  textKey?: string;
  type: TextType;
}> &
  TWithTransformAgentParam &
  TWithName &
  TObject3DParams &
  TWithTags;
