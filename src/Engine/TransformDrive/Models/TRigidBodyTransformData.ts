import type { Rotation, Vector } from '@dimforge/rapier3d';

export type TRigidBodyTransformData = Readonly<{ position?: Vector; rotation?: Rotation }>;

export type TAccumulatedRigidBodyTransformData = Readonly<{
  prevPosition: Vector | undefined;
  currPosition: Vector | undefined;
  prevRotation: Rotation | undefined;
  currRotation: Rotation | undefined;
}>;
