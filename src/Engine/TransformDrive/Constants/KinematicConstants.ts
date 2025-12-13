import { Quaternion, Vector3 } from 'three';

import type { TKinematicState, TKinematicTarget } from '@/Engine/Kinematic';
import { ForwardAxis } from '@/Engine/Kinematic';
import type { TMeters } from '@/Engine/Math';

export enum KinematicSpeed {
  Instant = 'instant'
}

export const DEFAULT_RADIUS: TMeters = 1e-3 as TMeters; // 1 millimeter

export const DefaultKinematicState: TKinematicState = {
  linearSpeed: 0,
  linearDirection: new Vector3(),
  angularSpeed: 0,
  radius: DEFAULT_RADIUS,
  angularDirection: new Quaternion(),
  forwardAxis: ForwardAxis.X,
  isInfiniteRotation: false
};

export const DefaultKinematicTarget: TKinematicTarget = {
  positionThreshold: 0.01,
  position: undefined,
  rotationThreshold: 0.0001,
  rotation: undefined
};
