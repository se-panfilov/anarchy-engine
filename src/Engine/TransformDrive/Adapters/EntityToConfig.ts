import { Euler } from 'three';

import type { TTransformDrive, TTransformDriveSerializedData } from '@/Engine/TransformDrive/Models';
import { eulerToXyz, vector3ToXyz } from '@/Engine/Utils';

export function transformDriveToConfig({ position$, rotation$, scale$, agent$ }: TTransformDrive<any>): TTransformDriveSerializedData {
  // TODO 15-0-0: Agent's data also should be serializable and available via config
  return {
    position: vector3ToXyz(position$.value),
    rotation: eulerToXyz(new Euler().setFromQuaternion(rotation$.value)),
    scale: vector3ToXyz(scale$.value),
    agent: agent$.value
  };
}
