import type { TWithCoordsXYZ } from '@/Engine/Mixins';

export type TWithMutableScaleConnector = Readonly<{
  scaleConnector: TWithCoordsXYZ;
}>;
