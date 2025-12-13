import type { Quaternion, Vector3, Vector3Like } from 'three';

import type { ForwardAxis } from '@/Kinematic/Constants';
import type { TMeters, TMetersPerSecond, TRadiansPerSecond } from '@/Math/Types';
import type { TEulerLike } from '@/ThreeLib';

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
    angularDirection: TEulerLike;
  }>;
