import type { Vector3Like } from 'three/src/math/Vector3';

import type { TWriteable } from '@/Engine/Utils';

export type TWithMutablePositionConnector = Readonly<{
  positionConnector: TWriteable<Vector3Like>;
}>;
