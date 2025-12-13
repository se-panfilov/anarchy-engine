import { ignoreDefaultStateKinematic } from '@Anarchy/Engine/Kinematic';
import type { TTransformDrive, TTransformDriveSerializedData } from '@Anarchy/Engine/TransformDrive/Models';
import { eulerToXyz, vector3ToXyz } from '@Anarchy/Engine/Utils';
import { Euler } from 'three';

export function transformDriveToConfig(drive: TTransformDrive<any>): TTransformDriveSerializedData {
  const { position$, rotation$, scale$, agent$ } = drive;

  return {
    physicsBodyName: drive.physics?.physicsBody$.value.name,
    kinematic: ignoreDefaultStateKinematic(drive.kinematic?.serialize()),
    position: vector3ToXyz(position$.value),
    rotation: eulerToXyz(new Euler().setFromQuaternion(rotation$.value)),
    scale: vector3ToXyz(scale$.value),
    agent: agent$.value
  };
}
