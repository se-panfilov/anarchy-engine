import type { Vector3Like } from 'three';

import type { TWriteable } from '@/Engine/Utils';

export type TWithMutableScaleConnector = Readonly<{
  scaleConnector: TWriteable<Vector3Like>;
}>;
