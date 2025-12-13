import type { Rotation, Vector } from '@dimforge/rapier3d';

export type TRigidBodyTransformData = Readonly<{ position?: Float32Array; rotation?: Float32Array }>;

export type TAccumulatedRigidBodyTransformData = Readonly<{
  prevPosition: Vector | undefined;
  currPosition: Vector | undefined;
  prevRotation: Rotation | undefined;
  currRotation: Rotation | undefined;
}>;
