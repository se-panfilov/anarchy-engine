import type { Vector2Like } from 'three';

import type { TKinematicConfig } from '@/Engine/Kinematic';
import type { TPhysicsBodyConfig } from '@/Engine/Physics';
import type { TObject3DParams, TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TTextParams } from './TTextParams';

export type TTextConfig = Omit<TTextParams, keyof TObject3DParams | 'center' | 'kinematic' | 'physics'> &
  Readonly<{
    center?: Vector2Like;
    kinematic?: TKinematicConfig;
    physics?: TPhysicsBodyConfig;
  }> &
  TObject3DPropConfig;
