import { Vector3 } from 'three';

import type { TKinematicConfig, TKinematicParams } from '@/Engine/Kinematic/Models';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: TKinematicConfig): TKinematicParams {
  const { linearDirection, angularDirection, ...rest } = config;

  return {
    ...rest,
    linearDirection: isDefined(linearDirection) ? new Vector3(linearDirection.x, linearDirection.y, linearDirection.z) : new Vector3(),
    angularDirection: isDefined(angularDirection) ? new Vector3(angularDirection.x, angularDirection.y, angularDirection.z) : new Vector3()
  };
}
