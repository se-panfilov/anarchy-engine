import type { ForwardAxis } from '@hellpig/anarchy-engine/Kinematic/Constants';
import type { TMeters, TMetersPerSecond, TRadiansPerSecond } from '@hellpig/anarchy-engine/Math/Types';
import type { TEulerLike } from '@hellpig/anarchy-engine/ThreeLib';
import type { Quaternion, Vector3, Vector3Like } from 'three';

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
