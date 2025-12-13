import type { Vector3Like } from 'three';

import type { TAudioBasicConfig } from './TAudioBasicConfig';

export type TAudio3dConfig = TAudioBasicConfig &
  Readonly<{
    position: Vector3Like;
  }>;
