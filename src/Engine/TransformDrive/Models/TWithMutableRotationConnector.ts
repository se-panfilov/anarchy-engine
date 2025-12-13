import type { TWithCoordsXYZ } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';

export type TWithMutableRotationConnector = Readonly<{
  rotationConnector: TWriteable<TWithCoordsXYZ>;
}>;
