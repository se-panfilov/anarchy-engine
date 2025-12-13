import type { Quaternion, Vector3, Vector3Like } from 'three';

import type { ForwardAxis } from '@/Engine/Kinematic/Constants';
import type { TMeters, TMetersPerSecond, TRadiansPerSecond } from '@/Engine/Math/Types';

export type TKinematicState = Readonly<{
  linearSpeed: TMetersPerSecond;
  linearDirection: Vector3;
  radius: TMeters;
  angularSpeed: TRadiansPerSecond;
  angularDirection: Quaternion;
  forwardAxis: ForwardAxis;
  isInfiniteRotation: boolean;
}>;

export type TKinematicConfigState = Omit<TKinematicState, 'linearDirection' | 'angularDirection'> &
  Readonly<{
    linearDirection: Vector3Like;
    angularDirection: Vector3Like;
  }>;
