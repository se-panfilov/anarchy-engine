import { Quaternion, Vector3 } from 'three';

import type { TKinematicConfig, TKinematicParams } from '@/Engine/Kinematic/Models';
import { isDefined, isEulerLike, isQuaternionLike } from '@/Engine/Utils';

export function configToParams(config: TKinematicConfig): TKinematicParams {
  const { linearDirection, angularDirection, ...rest } = config;

  let _angularDirection: Quaternion | undefined;

  if (isDefined(angularDirection)) {
    if (isEulerLike(angularDirection)) _angularDirection = new Quaternion().setFromEuler(angularDirection);
    else if (isQuaternionLike(angularDirection)) _angularDirection = new Quaternion(angularDirection.x, angularDirection.y, angularDirection.z, angularDirection.w);
    else throw new Error('Kinematic config to params: Invalid "angularDirection". Must be Quaternion or Euler.');
  }

  return {
    ...rest,
    linearDirection: isDefined(linearDirection) ? new Vector3(linearDirection.x, linearDirection.y, linearDirection.z) : new Vector3(),
    angularDirection: _angularDirection
  };
}
