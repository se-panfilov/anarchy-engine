import type { Intersection } from 'three';
import { Box3, Raycaster } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TCollisionCheckResult, TCollisionsService, TRaycastBvhService } from '@/Engine/Collisions/Models';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialCellWrapper, TSpatialGridWrapper } from '@/Engine/Spatial';
import { createBoundingBox } from '@/Engine/Spatial/Services/SpatialHelper';

import { RaycastBvhService } from './RaycastBvhService';

export function CollisionsService(): TCollisionsService {
  const bvhService: TRaycastBvhService = RaycastBvhService();

  // TODO (S.Panfilov) debug box
  let box: any;

  function checkCollision(actorW: TActorWrapperAsync, radius: number, spatialGrid: TSpatialGridWrapper, sceneW: TSceneWrapper): TCollisionCheckResult | undefined {
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

    // TODO (S.Panfilov) CWP something is wrong with this box. And actually, why it's a box? Who is an actor? A bullet or a target?
    const cells: ReadonlyArray<TSpatialCellWrapper> = spatialGrid.findCellsForBox(queryBox);

    // TODO (S.Panfilov) debug
    // console.log(cells.map((c: TSpatialCell) => c.id).join(', '));
    // const cells: ReadonlyArray<TSpatialCell> = spatialGrid.entity.search(queryBox);
    // eslint-disable-next-line functional/no-loop-statements
    for (const cell of cells) {
      // eslint-disable-next-line functional/no-loop-statements
      for (const object of cell.getObjects()) {
        // if (object.id !== actorW.id) {
        //   const intersection: Intersection = bvhService.raycastWithBvh(object as Mesh, actorW.entity);
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
          const raycaster: Raycaster = new Raycaster();

          // raycaster.set(actorW.entity.position, actorW.kinematic.getAzimuth());
          raycaster.set(actorW.entity.position, actorW.kinematic.getLinearDirection());

          const intersects: Array<Intersection> = [];
          bvhService.raycastWithBvh(object.entity, raycaster, intersects);

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
    }
    return undefined;
  }

  return {
    checkCollision,
    raycast: bvhService
  };
}

export const collisionsService: TCollisionsService = CollisionsService();
