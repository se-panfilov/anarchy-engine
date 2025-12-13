import type { TWithName, TWithTags } from '@/Engine/Mixins';
import type { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics/Constants';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';

import type { TPhysicsShapeParams } from './TPhysicsShapeParams';

export type TPhysicsBodyParams = Readonly<{
  // TODO  commented out "enabledRotations" and "enabledTranslations", because cannot serialize them at the moment
  // enabledRotations: TReadonlyVector3;
  // enabledTranslations: TReadonlyVector3;
  angularVelocity?: TReadonlyVector3;
  ccdEnabled?: boolean;
  collisionGroups?: number;
  collisionShape: CollisionShape;
  density?: number;
  dominanceGroup?: number;
  friction?: number;
  gravityScale?: number;
  isSensor?: boolean;
  isSleep?: boolean;
  linearVelocity?: TReadonlyVector3;
  mass?: number;
  position: TReadonlyVector3;
  restitution?: number;
  rotation: TReadonlyQuaternion;
  shapeParams: TPhysicsShapeParams;
  solverGroups?: number;
  type: RigidBodyTypesNames;
}> &
  TWithName &
  TWithTags;
