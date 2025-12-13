import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import type { Intersection } from 'three';
import { Box3, Raycaster } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TCollisionCheckResult, TCollisionsService, TRaycastBvhService } from '@/Engine/Collisions/Models';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialCell, TSpatialCellWrapper } from '@/Engine/Spatial';
import { createBoundingBox } from '@/Engine/Spatial/Services/SpatialHelper';
import { isDefined } from '@/Engine/Utils';

import { RaycastBvhService } from './RaycastBvhService';

export function CollisionsService(): TCollisionsService {
  const raycastBvhService: TRaycastBvhService = RaycastBvhService();

  // TODO (S.Panfilov) debug box
  let box: any;

  // TODO (S.Panfilov) extract to collision watcher
  function createCollisionsWatcher(actorW: TActorWrapperAsync, radius: number, sceneW: TSceneWrapper): Readonly<{ checkCollisions: () => TCollisionCheckResult | undefined; stop: () => void }> {
    const value$: Subject<TCollisionCheckResult> = new Subject<TCollisionCheckResult>();
    let actorsToCheck: ReadonlyArray<TActorWrapperAsync> = [];
    let cellSubs$: ReadonlyArray<Subscription> = [];

    function unsubscribeFromCells(): void {
      cellSubs$.forEach((s: Subscription): void => s.unsubscribe());
      cellSubs$ = [];
    }

    function subscribeToCells(cells: ReadonlyArray<TSpatialCellWrapper>): void {
      cellSubs$ = cells.map((cell: TSpatialCellWrapper): Subscription => {
        return cell.update$.subscribe(({ objects }: TSpatialCell): void => {
          actorsToCheck = objects.filter((a: TActorWrapperAsync): boolean => a.id !== actorW.id);
        });
      });
    }

    // TODO (S.Panfilov) CWP What if bullet is not in the grid? Should be still possible to get actors from a grid anyway
    // TODO (S.Panfilov) CWP Also remember that bullet could be bigger than 1 cell
    // TODO (S.Panfilov) CWP test this code (should not produce memory leaks)
    let actorSub$: Subscription | undefined = actorW.spatial.cellsChanged$.subscribe((cells: ReadonlyArray<TSpatialCellWrapper>): void => {
      if (isDefined(actorSub$)) actorSub$.unsubscribe();

      unsubscribeFromCells();
      actorsToCheck = cells.flatMap((cell: TSpatialCellWrapper) => cell.getObjects()).filter((a: TActorWrapperAsync): boolean => a.id !== actorW.id);
      subscribeToCells(cells);
    });

    collisionLoopService.tick$.subscribe((): void => {
      const collision: TCollisionCheckResult | undefined = checkCollisions(actorW, radius, actorsToCheck, sceneW);
      if (isDefined(collision)) value$.next(collision);
    });

    return {
      stop: (): void => {
        actorSub$?.unsubscribe();
        actorSub$ = undefined;
        unsubscribeFromCells();
        collisionLoopService.tick$.unsubscribe();
      },
      value$: value$.asObservable()
    };
  }

  // TODO (S.Panfilov) debug scene
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
    createCollisionsWatcher,
    raycast: raycastBvhService
  };
}

export const collisionsService: TCollisionsService = CollisionsService();
