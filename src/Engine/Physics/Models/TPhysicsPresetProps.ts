import type { RigidBodyType } from '@dimforge/rapier3d';

import type { TWithCoordsXYZ } from '@/Engine/Mixins';
import type { CollisionShape } from '@/Engine/Physics/Constants';
import type { TBoxGeometryProps, TPlaneGeometryProps, TSphereGeometryProps } from '@/Engine/ThreeLib';

export type TPhysicsGlobalProps = Readonly<{
  gravity: TWithCoordsXYZ;
  timeStep?: number;
  enableCCD?: boolean;
}>;

export type TPhysicsPresetProps = Readonly<{
  type: RigidBodyType;
  collisionShape: CollisionShape;
  mass?: number;
  restitution?: number;
  friction?: number;
  collisionGroups?: number;
}> &
  TBoxGeometryProps &
  TSphereGeometryProps &
  TPlaneGeometryProps;
