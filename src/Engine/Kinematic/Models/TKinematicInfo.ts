import type { TWithCoordsXYZ } from '@/Engine/Mixins';

export type TKinematicInfo = Readonly<{
  linearVelocity: TWithCoordsXYZ;
  angularVelocity: TWithCoordsXYZ;
  principalInertia: TWithCoordsXYZ;
}>;
