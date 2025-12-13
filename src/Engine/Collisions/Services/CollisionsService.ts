import type { Intersection, Mesh } from 'three';
import { Box3, Raycaster } from 'three';

import type { TBvhService, TCollisionCheckResult, TCollisionsService, TSpatialGridService } from '@/Engine/Collisions/Models';

import { BvhService } from './BvhService';
import { SpatialGridService } from './SpatialGridService';

export function CollisionsService(): TCollisionsService {
  const bvhService: TBvhService = BvhService();
  const spatialGridService: TSpatialGridService = SpatialGridService();
  const spatialGrid = spatialGridService.getSpatialGrid();

  function checkCollision(bullet: Mesh, radius: number): TCollisionCheckResult | null {
    const bulletBox: Box3 = new Box3().setFromObject(bullet);
    const queryBox = {
      minX: bulletBox.min.x - radius,
      minY: bulletBox.min.y - radius,
      minZ: bulletBox.min.z - radius,
      maxX: bulletBox.max.x + radius,
      maxY: bulletBox.max.y + radius,
      maxZ: bulletBox.max.z + radius
    };

    const candidates = spatialGrid.search(queryBox);
    // eslint-disable-next-line functional/no-loop-statements
    for (const candidate of candidates) {
      if (candidate.object !== bullet) {
        const raycaster = new Raycaster();
        raycaster.set(bullet.position, bullet.direction);

        const intersects: Intersection[] = [];
        bvhService.raycastWithBVH(candidate.object as Mesh, raycaster, intersects);

        if (intersects.length > 0) {
          const intersect = intersects[0];
          return {
            object: candidate.object,
            distance: intersect.distance,
            collisionPoint: intersect.point,
            bulletPosition: bullet.position.clone()
          };
        }
      }
    }
    return null;
  }

  return {
    checkCollision,
    ...bvhService,
    ...spatialGridService
  };
}

export const collisionsService: TCollisionsService = CollisionsService();
