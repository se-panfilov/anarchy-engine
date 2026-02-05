import type { TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';
import type { CollisionShape, RigidBodyTypesNames } from '@hellpig/anarchy-engine/Physics/Constants';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@hellpig/anarchy-engine/ThreeLib';

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
