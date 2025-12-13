import type { Intersection } from 'three';
import { Box3, Raycaster } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TCollisionCheckResult, TCollisionsService, TRaycastBvhService } from '@/Engine/Collisions/Models';
import type { TSceneWrapper } from '@/Engine/Scene';
import { createBoundingBox } from '@/Engine/Spatial/Services/SpatialHelper';

import { RaycastBvhService } from './RaycastBvhService';

export function CollisionsService(): TCollisionsService {
  const raycastBvhService: TRaycastBvhService = RaycastBvhService();

  // TODO (S.Panfilov) debug box
  let box: any;

  // TODO (S.Panfilov) debug sceneW
  function checkCollisions(actorW: TActorWrapperAsync, radius: number, actorsToCheck: ReadonlyArray<TActorWrapperAsync>, sceneW: TSceneWrapper): TCollisionCheckResult | undefined {
    const actorBox: Box3 = new Box3().setFromObject(actorW.entity);
    const queryBox = {
      minX: actorBox.min.x - radius,
      minY: actorBox.min.y - radius,
      minZ: actorBox.min.z - radius,
      maxX: actorBox.max.x + radius,
      maxY: actorBox.max.y + radius,
      maxZ: actorBox.max.z + radius
    };

    // TODO (S.Panfilov) debug
    if (box) sceneW.entity.remove(box);
    box = createBoundingBox(queryBox.minX, queryBox.minZ, queryBox.maxX, queryBox.maxZ, 'red');
    sceneW.entity.add(box);

    // eslint-disable-next-line functional/no-loop-statements
    for (const object of actorsToCheck) {
      // if (object.id !== actorW.id) {
      //   const intersection: Intersection = raycastBvhService.raycastWithBvh(object as Mesh, actorW.entity);
      //   if (intersection.distance < radius) {
      //     return {
      //       object,
      //       distance: intersection.distance,
      //       collisionPoint: intersection.point,
      //       bulletPosition: actorW.entity.position.clone()
      //     };
      //   }
      // }
      ////
      if (object.id !== actorW.id) {
        // TODO (S.Panfilov) why we need this raycaster?
        const raycaster: Raycaster = new Raycaster();

        // raycaster.set(actorW.entity.position, actorW.kinematic.getAzimuth());
        raycaster.set(actorW.entity.position, actorW.kinematic.getLinearDirection());

        const intersects: Array<Intersection> = [];
        raycastBvhService.raycastWithBvh(object.entity, raycaster, intersects);

        if (intersects.length > 0) {
          const intersect = intersects[0];
          return {
            object: object.entity,
            distance: intersect.distance,
            collisionPoint: intersect.point,
            bulletPosition: actorW.entity.position.clone()
          };
        }
      }
      ////
    }

    return undefined;
  }

  return {
    checkCollisions,
    raycast: raycastBvhService
  };
}
