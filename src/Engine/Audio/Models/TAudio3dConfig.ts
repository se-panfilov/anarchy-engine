import type { Vector3Like } from 'three';

import type { TAudioConfig } from './TAudioConfig';

export type TAudio3dConfig = TAudioConfig &
  Readonly<{
    position: Vector3Like;
  }>;
