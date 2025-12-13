import type { Intersection, Mesh } from 'three';
import { Box3, Raycaster } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TBvhService, TCollisionCheckResult, TCollisionsService, TSpatialGridService } from '@/Engine/Collisions/Models';

import { BvhService } from './BvhService';
import { SpatialGridService } from './SpatialGridService';

export function CollisionsService(): TCollisionsService {
  const bvhService: TBvhService = BvhService();
  const spatialGridService: TSpatialGridService = SpatialGridService();
  const spatialGrid = spatialGridService.getSpatialGrid();

  function checkCollision(actorW: TActorWrapperAsync, radius: number): TCollisionCheckResult | null {
    const actorBox: Box3 = new Box3().setFromObject(actorW.entity);
    const queryBox = {
      minX: actorBox.min.x - radius,
      minY: actorBox.min.y - radius,
      minZ: actorBox.min.z - radius,
      maxX: actorBox.max.x + radius,
      maxY: actorBox.max.y + radius,
      maxZ: actorBox.max.z + radius
    };

    const candidates = spatialGrid.search(queryBox);
    // eslint-disable-next-line functional/no-loop-statements
    for (const candidate of candidates) {
      if (candidate.object !== actorW.entity) {
        const raycaster: Raycaster = new Raycaster();
        // TODO (S.Panfilov) should be not any actor, but actor with direction
        raycaster.set(actorW.entity.position, actorW.direction);

        const intersects: Array<Intersection> = [];
        bvhService.raycastWithBVH(candidate.object as Mesh, raycaster, intersects);

        if (intersects.length > 0) {
          const intersect = intersects[0];
          return {
            object: candidate.object,
            distance: intersect.distance,
            collisionPoint: intersect.point,
            bulletPosition: actorW.entity.position.clone()
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
