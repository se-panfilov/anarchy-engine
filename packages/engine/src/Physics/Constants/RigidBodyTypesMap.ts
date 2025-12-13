import { RigidBodyType } from '@dimforge/rapier3d';
import { RigidBodyTypesNames } from '@Engine/Physics/Constants/RigidBodyTypeNames';

const { Dynamic, Fixed, KinematicVelocityBased, KinematicPositionBased } = RigidBodyType;

export const RigidBodyTypesMap: Readonly<Record<RigidBodyTypesNames, RigidBodyType>> = {
  [RigidBodyTypesNames.Dynamic]: Dynamic,
  [RigidBodyTypesNames.Fixed]: Fixed,
  [RigidBodyTypesNames.KinematicVelocityBased]: KinematicVelocityBased,
  [RigidBodyTypesNames.KinematicPositionBased]: KinematicPositionBased
};
