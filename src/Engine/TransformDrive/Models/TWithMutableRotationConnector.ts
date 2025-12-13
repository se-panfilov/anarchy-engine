import type { Vector3Like } from 'three/src/math/Vector3';

import type { TWriteable } from '@/Engine/Utils';

export type TWithMutableRotationConnector = Readonly<{
  rotationConnector: TWriteable<Vector3Like>;
}>;
