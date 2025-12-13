import type { Vector3Like } from 'three/src/math/Vector3';

import type { TKinematicData } from './TKinematicData';

export type TKinematicDataConfig = Omit<TKinematicData, 'linearDirection' | 'angularDirection'> &
  Readonly<{
    linearDirection: Vector3Like;
    angularDirection: Vector3Like;
  }>;
