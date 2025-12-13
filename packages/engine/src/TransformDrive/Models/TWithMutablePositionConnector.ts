import type { Vector3Like } from 'three';

import type { TWriteable } from '@/Engine/Utils';

export type TWithMutablePositionConnector = Readonly<{
  positionConnector: TWriteable<Vector3Like>;
}>;
