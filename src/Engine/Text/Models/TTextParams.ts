import type { Vector2 } from 'three';

import type { TKinematicParams } from '@/Engine/Kinematic';
import type { TWithNameOptional, TWithTags } from '@/Engine/Mixins';
import type { TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import type { TextType } from '@/Engine/Text/Constants';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

import type { TTextCssProps } from './TTextCssProps';

export type TTextParams = Readonly<{
  text: string;
  type: TextType;
  cssProps?: TTextCssProps;
  center?: Vector2;
  elementType?: string;
  kinematic?: TKinematicParams;
  physics?: TWithPresetNamePhysicsBodyParams;
}> &
  TWithTransformAgentParam &
  TWithNameOptional &
  TObject3DParams &
  TWithTags;
