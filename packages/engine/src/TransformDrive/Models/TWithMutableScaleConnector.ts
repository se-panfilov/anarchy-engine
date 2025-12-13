import type { Vector3Like } from 'three';

import type { TWriteable } from '@/Utils';

export type TWithMutableScaleConnector = Readonly<{
  scaleConnector: TWriteable<Vector3Like>;
}>;
