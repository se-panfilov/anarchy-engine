import type { TWithCoordsXYZ } from '@/Engine/Mixins';

export type TKinematicData = Readonly<{
  linearVelocity: TWithCoordsXYZ | undefined;
  angularVelocity: TWithCoordsXYZ | undefined;
  principalInertia: TWithCoordsXYZ | undefined;
}>;
