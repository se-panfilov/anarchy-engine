import type { Vector } from '@dimforge/rapier3d/math';

export type TKinematicInfo = Readonly<{
  mass: number;
  linearVelocity: Vector;
  angularVelocity: Vector;
  principalInertia: Vector;
}>;
