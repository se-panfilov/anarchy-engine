import type { TWithCoordsXYZ } from '@/Engine/Mixins';

export type TKinematicInfo = Readonly<{
  linearVelocity: TWithCoordsXYZ | undefined;
  angularVelocity: TWithCoordsXYZ | undefined;
  principalInertia: TWithCoordsXYZ | undefined;
}>;
