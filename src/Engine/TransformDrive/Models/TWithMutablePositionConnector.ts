import type { TWithCoordsXYZ } from '@/Engine/Mixins';

export type TWithMutablePositionConnector = Readonly<{
  positionConnector: TWithCoordsXYZ;
}>;
