import type { TKinematicConfig } from '@hellpig/anarchy-engine/Kinematic';
import type { TObject3DParams, TObject3DPropConfig } from '@hellpig/anarchy-engine/ThreeLib';
import type { Vector2Like } from 'three';

import type { TTextParams } from './TTextParams';

export type TTextConfig = Omit<TTextParams, keyof TObject3DParams | 'center' | 'kinematic' | 'physicsBody'> &
  Readonly<{
    center?: Vector2Like;
    kinematic?: TKinematicConfig;
    physicsBodyName?: string;
  }> &
  TObject3DPropConfig;
