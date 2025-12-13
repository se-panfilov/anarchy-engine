import type { TWithCoordsXYZ } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';

export type TWithMutableScaleConnector = Readonly<{
  scaleConnector: TWriteable<TWithCoordsXYZ>;
}>;
