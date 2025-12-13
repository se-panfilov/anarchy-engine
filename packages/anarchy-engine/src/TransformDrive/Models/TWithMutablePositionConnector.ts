import type { TWriteable } from '@Shared/Utils';
import type { Vector3Like } from 'three';

export type TWithMutablePositionConnector = Readonly<{
  positionConnector: TWriteable<Vector3Like>;
}>;
