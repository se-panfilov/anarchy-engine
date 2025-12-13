import type { Vector2 } from 'three';

import type { TKinematicParams } from '@/Kinematic';
import type { TWithName, TWithTags } from '@/Mixins';
import type { TPhysicsBody } from '@/Physics';
import type { TextType } from '@/Text/Constants';
import type { TObject3DParams } from '@/ThreeLib';
import type { TWithTransformAgentParam } from '@/TransformDrive';

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
