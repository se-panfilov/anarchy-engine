import { Quaternion, Vector3 } from 'three';

import type { TKinematicConfig, TKinematicParams } from '@/Engine/Kinematic/Models';
import { isDefined, isEulerLike, isQuaternionLike } from '@/Engine/Utils';

export function configToParams(config: TKinematicConfig): TKinematicParams {
  const { state, target, ...rest } = config;
  const { linearDirection, angularDirection, ...stateRest } = state ?? {};
  const { positionThreshold, position, rotationThreshold, rotation, ...targetRest } = target ?? {};

  let _angularDirection: Quaternion | undefined;

  if (isDefined(angularDirection)) {
    if (isEulerLike(angularDirection)) _angularDirection = new Quaternion().setFromEuler(angularDirection);
    else if (isQuaternionLike(angularDirection)) _angularDirection = new Quaternion(angularDirection.x, angularDirection.y, angularDirection.z, angularDirection.w);
    else throw new Error('Kinematic config to params: Invalid "angularDirection". Must be Quaternion or Euler.');
  }

  return {
    ...rest,
    state: {
      ...stateRest,
      linearDirection: isDefined(linearDirection) ? new Vector3(linearDirection.x, linearDirection.y, linearDirection.z) : new Vector3(),
      angularDirection: _angularDirection
    },
    target: {
      ...targetRest,
      positionThreshold: positionThreshold ?? 0.01,
      position: isDefined(position) ? new Vector3(position.x, position.y, position.z) : new Vector3(),
      rotationThreshold: rotationThreshold ?? 0.0001, // 0.0001 rad = 0.0057 deg
      rotation: isDefined(rotation) ? new Quaternion(rotation.x, rotation.y, rotation.z, rotation.w) : new Quaternion()
    }
  };
}
