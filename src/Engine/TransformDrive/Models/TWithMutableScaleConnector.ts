import type { Vector3Like } from 'three/src/math/Vector3';

import type { TWriteable } from '@/Engine/Utils';

export type TWithMutableScaleConnector = Readonly<{
  scaleConnector: TWriteable<Vector3Like>;
}>;
