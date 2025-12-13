import { Quaternion, Vector3 } from 'three';

import type { TKinematicConfig, TKinematicParams } from '@/Engine/Kinematic/Models';
import { toQuaternion } from '@/Engine/Math';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: TKinematicConfig): TKinematicParams {
  const { state, target, ...rest } = config;
  const { linearDirection, angularDirection, ...stateRest } = state ?? {};
  const { positionThreshold, position, rotationThreshold, rotation, ...targetRest } = target ?? {};

  return {
    ...rest,
    state: {
      ...stateRest,
      linearDirection: isDefined(linearDirection) ? new Vector3(linearDirection.x, linearDirection.y, linearDirection.z) : new Vector3(),
      angularDirection: isDefined(angularDirection) ? toQuaternion(angularDirection) : undefined
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
