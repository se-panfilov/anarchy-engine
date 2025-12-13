import type { Vector2Like } from 'three';

import type { TKinematicConfig } from '@/Kinematic';
import type { TObject3DParams, TObject3DPropConfig } from '@/ThreeLib';

import type { TTextParams } from './TTextParams';

export type TTextConfig = Omit<TTextParams, keyof TObject3DParams | 'center' | 'kinematic' | 'physicsBody'> &
  Readonly<{
    center?: Vector2Like;
    kinematic?: TKinematicConfig;
    physicsBodyName?: string;
  }> &
  TObject3DPropConfig;
