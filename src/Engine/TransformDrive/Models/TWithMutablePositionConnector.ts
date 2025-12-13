import type { TWithCoordsXYZ } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';

export type TWithMutablePositionConnector = Readonly<{
  positionConnector: TWriteable<TWithCoordsXYZ>;
}>;
