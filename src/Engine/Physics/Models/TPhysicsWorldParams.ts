import type {
  RawBroadPhase,
  RawCCDSolver,
  RawColliderSet,
  RawDebugRenderPipeline,
  RawImpulseJointSet,
  RawIntegrationParameters,
  RawIslandManager,
  RawMultibodyJointSet,
  RawNarrowPhase,
  RawPhysicsPipeline,
  RawQueryPipeline,
  RawRigidBodySet,
  RawSerializationPipeline
} from '@dimforge/rapier3d-compat/rapier_wasm3d';

import type { TWithCoordsXYZ } from '@/Engine/Mixins';

export type TPhysicsWorldParams = Readonly<{
  gravity?: TWithCoordsXYZ;
  rawIntegrationParameters?: RawIntegrationParameters;
  rawIslands?: RawIslandManager;
  rawBroadPhase?: RawBroadPhase;
  rawNarrowPhase?: RawNarrowPhase;
  rawBodies?: RawRigidBodySet;
  rawColliders?: RawColliderSet;
  rawImpulseJoints?: RawImpulseJointSet;
  rawMultibodyJoints?: RawMultibodyJointSet;
  rawCCDSolver?: RawCCDSolver;
  rawQueryPipeline?: RawQueryPipeline;
  rawPhysicsPipeline?: RawPhysicsPipeline;
  rawSerializationPipeline?: RawSerializationPipeline;
  rawDebugRenderPipeline?: RawDebugRenderPipeline;
}>;
