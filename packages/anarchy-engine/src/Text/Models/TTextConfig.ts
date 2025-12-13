import type { TKinematicConfig } from '@Anarchy/Engine/Kinematic';
import type { TObject3DParams, TObject3DPropConfig } from '@Anarchy/Engine/ThreeLib';
import type { Vector2Like } from 'three';

import type { TTextParams } from './TTextParams';

export type TTextConfig = Omit<TTextParams, keyof TObject3DParams | 'center' | 'kinematic' | 'physicsBody'> &
  Readonly<{
    center?: Vector2Like;
    kinematic?: TKinematicConfig;
    physicsBodyName?: string;
  }> &
  TObject3DPropConfig;
