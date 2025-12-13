import type { Quaternion, Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { TMeters, TMetersPerSecond, TRadiansPerSecond } from '@/Engine/Math/Types';

export type TKinematicState = Readonly<{
  linearSpeed: TMetersPerSecond;
  linearDirection: Vector3;
  radius: TMeters;
  angularSpeed: TRadiansPerSecond;
  angularDirection: Quaternion;
  forwardAxis: 'X' | 'Z';
}>;

export type TKinematicConfigState = Omit<TKinematicState, 'linearDirection' | 'angularDirection'> &
  Readonly<{
    linearDirection: Vector3Like;
    angularDirection: Vector3Like;
  }>;
