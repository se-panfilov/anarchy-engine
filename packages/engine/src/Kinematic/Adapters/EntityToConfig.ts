import type { TKinematicConfig, TKinematicConfigTarget } from '@Engine/Kinematic/Models';
import type { TKinematicTransformAgent } from '@Engine/TransformDrive';
import { eulerToXyz, filterOutEmptyFields, isDefined, quaternionToXyzw, vector3ToXyz } from '@Engine/Utils';
import { Euler } from 'three';

export function kinematicToConfig(entity: TKinematicTransformAgent): TKinematicConfig {
  const { linearSpeed, linearDirection, angularSpeed, angularDirection, radius, forwardAxis, isInfiniteRotation } = entity.data.state;

  let target: TKinematicConfigTarget | undefined = undefined;
  if (isDefined(entity.data.target)) {
    target = {
      position: isDefined(entity.data.target.position) ? vector3ToXyz(entity.data.target.position) : undefined,
      rotation: isDefined(entity.data.target.rotation) ? quaternionToXyzw(entity.data.target.rotation) : undefined,
      positionThreshold: entity.data.target.positionThreshold,
      rotationThreshold: entity.data.target.rotationThreshold
    };
  }

  return filterOutEmptyFields({
    isAutoUpdate: entity.autoUpdate$.value,
    target,
    state: {
      linearSpeed,
      linearDirection: vector3ToXyz(linearDirection),
      angularSpeed,
      angularDirection: eulerToXyz(new Euler().setFromQuaternion(angularDirection)),
      radius,
      forwardAxis,
      isInfiniteRotation
    }
  });
}
