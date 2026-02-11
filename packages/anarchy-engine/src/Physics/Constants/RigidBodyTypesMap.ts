import { RigidBodyTypesNames } from '@Anarchy/Engine/Physics/Constants/RigidBodyTypeNames';
import { RigidBodyType } from '@dimforge/rapier3d';

const { Dynamic, Fixed, KinematicVelocityBased, KinematicPositionBased } = RigidBodyType;

export const RigidBodyTypesMap: Readonly<Record<RigidBodyTypesNames, RigidBodyType>> = {
  [RigidBodyTypesNames.Dynamic]: Dynamic,
  [RigidBodyTypesNames.Fixed]: Fixed,
  [RigidBodyTypesNames.KinematicVelocityBased]: KinematicVelocityBased,
  [RigidBodyTypesNames.KinematicPositionBased]: KinematicPositionBased
};
