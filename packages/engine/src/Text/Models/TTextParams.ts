import type { TKinematicParams } from '@Engine/Kinematic';
import type { TWithName, TWithTags } from '@Engine/Mixins';
import type { TPhysicsBody } from '@Engine/Physics';
import type { TextType } from '@Engine/Text/Constants';
import type { TObject3DParams } from '@Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@Engine/TransformDrive';
import type { Vector2 } from 'three';

import type { TTextCssProps } from './TTextCssProps';

export type TTextParams = Readonly<{
  center?: Vector2;
  cssProps?: TTextCssProps;
  elementType?: string;
  kinematic?: TKinematicParams;
  physicsBody?: TPhysicsBody;
  text: string;
  type: TextType;
}> &
  TWithTransformAgentParam &
  TWithName &
  TObject3DParams &
  TWithTags;
