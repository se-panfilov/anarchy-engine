import type { TKinematicParams } from '@hellpig/anarchy-engine/Kinematic';
import type { TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';
import type { TPhysicsBody } from '@hellpig/anarchy-engine/Physics';
import type { TextType } from '@hellpig/anarchy-engine/Text/Constants';
import type { TObject3DParams } from '@hellpig/anarchy-engine/ThreeLib';
import type { TWithTransformAgentParam } from '@hellpig/anarchy-engine/TransformDrive';
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
