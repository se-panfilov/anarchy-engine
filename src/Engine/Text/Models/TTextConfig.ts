import type { Vector2Like } from 'three';

import type { TKinematicDataConfig } from '@/Engine/Kinematic';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TWithPresetNamePhysicsBodyConfig } from '@/Engine/Physics';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TTextProps } from './TTextProps';

export type TTextConfig = Omit<TTextProps, 'center' | 'kinematic'> &
  Readonly<{
    center?: Vector2Like;
    kinematic?: TKinematicDataConfig;
    physics?: TWithPresetNamePhysicsBodyConfig;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
