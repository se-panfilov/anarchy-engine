import { Euler } from 'three';

import { ignoreDefaultStateKinematic } from '@/Engine/Kinematic';
import type { TTransformDrive, TTransformDriveSerializedData } from '@/Engine/TransformDrive/Models';
import { eulerToXyz, vector3ToXyz } from '@/Engine/Utils';

export function transformDriveToConfig(drive: TTransformDrive<any>): TTransformDriveSerializedData {
  const { position$, rotation$, scale$, agent$ } = drive;

  return {
    // TODO 15-0-0: should we look for presetName here? (use "physicsPresetService.getPresetByName(presetName)")
    physics: drive.physical?.serialize(),
    kinematic: ignoreDefaultStateKinematic(drive.kinematic?.serialize()),
    position: vector3ToXyz(position$.value),
    rotation: eulerToXyz(new Euler().setFromQuaternion(rotation$.value)),
    scale: vector3ToXyz(scale$.value),
    agent: agent$.value
  };
}
