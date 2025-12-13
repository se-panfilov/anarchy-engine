import type { TWithCoordsXYZ } from '@/Engine/Mixins';

export type TWithMutableRotationConnector = Readonly<{
  rotationConnector: TWithCoordsXYZ;
}>;
