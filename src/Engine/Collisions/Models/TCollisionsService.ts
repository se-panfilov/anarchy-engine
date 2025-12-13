import type { Mesh } from 'three';

import type { TBvhService } from './TBvhService';
import type { TCollisionCheckResult } from './TCollisionCheckResult';
import type { TSpatialGridService } from './TSpatialGridService';

export type TCollisionsService = Readonly<{
  checkCollision: (bullet: Mesh, radius: number) => TCollisionCheckResult | null;
}> &
  TSpatialGridService &
  TBvhService;
