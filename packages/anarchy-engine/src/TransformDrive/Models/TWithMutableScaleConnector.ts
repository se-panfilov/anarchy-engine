import type { TWriteable } from '@hellpig/anarchy-shared/Utils';
import type { Vector3Like } from 'three';

export type TWithMutableScaleConnector = Readonly<{
  scaleConnector: TWriteable<Vector3Like>;
}>;
