import { Euler, Quaternion, Vector3 } from 'three';

import type { TKinematicConfigState, TKinematicState, TKinematicTarget } from '@/Kinematic';
import { ForwardAxis } from '@/Kinematic';
import type { TMeters } from '@/Math';
import { eulerToXyz, vector3ToXyz } from '@/Utils';

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

export const DefaultKinematicConfigState: TKinematicConfigState = {
  ...DefaultKinematicState,
  angularDirection: eulerToXyz(new Euler().setFromQuaternion(DefaultKinematicState.angularDirection)),
  linearDirection: vector3ToXyz(DefaultKinematicState.linearDirection)
};

export const DefaultKinematicTarget: TKinematicTarget = {
  positionThreshold: 0.01,
  position: undefined,
  rotationThreshold: 0.0001,
  rotation: undefined
};

export const DefaultIsAutoUpdate: boolean = true;
