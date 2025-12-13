import type { TWithCoordsXYZ } from '@/Engine/Mixins';

export type TPhysicsGlobalProps = Readonly<{
  gravity: TWithCoordsXYZ;
  timeStep?: number;
  enableCCD?: boolean;
}>;
