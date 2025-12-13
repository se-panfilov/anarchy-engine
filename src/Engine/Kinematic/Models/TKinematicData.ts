import type { Vector3 } from 'three';

import type { TMetersPerSecond } from '@/Engine/Math/Types';

export type TKinematicData = Readonly<{
  linearSpeed: TMetersPerSecond;
  linearDirection: Vector3;
  angularSpeed: TMetersPerSecond;
  angularDirection: Vector3;
}>;
