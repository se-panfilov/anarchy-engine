import { Subject } from 'rxjs';

import type { TActorParams, TActorWrapperAsync } from '@/Engine/Actor';
import { CollisionsUpdatePriority } from '@/Engine/Collisions/Constants';
import type { TCollisionCheckResult, TCollisionsData, TCollisionsLoopService, TCollisionsService, TWithCollisions } from '@/Engine/Collisions/Models';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialCellWrapper } from '@/Engine/Spatial';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

// TODO (S.Panfilov) debug sceneW
export function withCollisions(params: TActorParams, collisionsService: TCollisionsService, collisionLoopService: TCollisionsLoopService, sceneW: TSceneWrapper): TWithCollisions {
  let _isAutoUpdate: boolean = params.isCollisionsAutoUpdate ?? false;
  const value$: Subject<TCollisionCheckResult> = new Subject<TCollisionCheckResult>();
  // const cellSubs$: ReadonlyArray<Subscription> = [];

  // function unsubscribeFromCells(): void {
  //   cellSubs$.forEach((s: Subscription): void => s.unsubscribe());
  //   cellSubs$ = [];
  // }
  //
  // function subscribeToCells(cells: ReadonlyArray<TSpatialCellWrapper>): void {
  //   cellSubs$ = cells.map((cell: TSpatialCellWrapper): Subscription => {
  //     return cell.update$.subscribe(({ objects }: TSpatialCell): void => {
  //       actorsToCheck = objects.filter((a: TActorWrapperAsync): boolean => a.id !== actorW.id);
  //     });
  //   });
  // }

  // TODO (S.Panfilov) What if bullet is not in the grid? Should be still possible to get actors from a grid anyway (could have if/else and 2 checks for bullet in grid and not in grid)
  // TODO (S.Panfilov) Also remember that bullet could be bigger than 1 cell
  // TODO (S.Panfilov) test this code (should not produce memory leaks)
  // let actorSub$: Subscription | undefined = actorW.spatial.cellsChanged$.subscribe((cells: ReadonlyArray<TSpatialCellWrapper>): void => {
  //   if (isDefined(actorSub$)) actorSub$.unsubscribe();
  //
  //   unsubscribeFromCells();
  //   subscribeToCells(cells);
  // });

  // collisionLoopService.tick$.subscribe((): void => {
  //   // TODO (S.Panfilov) debug sceneW
  //   const collision: TCollisionCheckResult | undefined = collisionsService.checkCollisions(actorW, radius, actorsToCheck, sceneW);
  //   if (isDefined(collision)) value$.next(collision);
  // });

  // TODO (S.Panfilov) test this code (should work)
  function getActorsToCheck(actorW: TActorWrapperAsync): ReadonlyArray<TActorWrapperAsync> {
    const cells: ReadonlyArray<TSpatialCellWrapper> = actorW.spatial.getSpatialCells();
    if (cells.length > 0) return actorW.spatial.getSpatialCells().flatMap((cell: TSpatialCellWrapper): ReadonlyArray<TActorWrapperAsync> => cell.getObjects());
    return [];
    // TODO (S.Panfilov) this code is probably an extra overcomplicated corner case)
    // const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName(gridName);
    // if (isNotDefined(grid)) throw new Error(`Cannot check collisions for actor (id: "${actorW.id}", name: "${actorW.name}"): actor doesn't belong to spatial grid, and no grid name with name "${gridName}" exists`);
    // return grid.findCellsByActorBox(actorW).flatMap((cell: TSpatialCellWrapper): ReadonlyArray<TActorWrapperAsync> => cell.getObjects());
  }

  return {
    collisions: {
      data: {
        updatePriority: params.collisions?.updatePriority ?? CollisionsUpdatePriority.LOW,
        radius: params.collisions?.radius ?? 0.01
      },
      start(actorW: TActorWrapperAsync): void {
        collisionLoopService.tick$.subscribe((): void => {
          // TODO (S.Panfilov) debug sceneW
          const collision: TCollisionCheckResult | undefined = collisionsService.checkCollisions(actorW, this.data.radius, getActorsToCheck(actorW), sceneW);
          if (isDefined(collision)) value$.next(collision);
        });
      },
      setData({ updatePriority }: TCollisionsData): void {
        this.setCollisionsUpdatePriority(updatePriority);
      },
      getData(): TCollisionsData {
        return this.data;
      },
      setCollisionsUpdatePriority(value: CollisionsUpdatePriority): void {
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TCollisionsData>).updatePriority = value;
      },
      getCollisionsUpdatePriority(): CollisionsUpdatePriority {
        return this.data.updatePriority;
      },
      setRadius(value: number): void {
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TCollisionsData>).radius = value;
      },
      getRadius(): number {
        return this.data.radius;
      },
      isAutoUpdate(): boolean {
        return _isAutoUpdate;
      },
      setAutoUpdate(value: boolean): void {
        _isAutoUpdate = value;
      },
      destroy: (): void => {
        // actorSub$?.unsubscribe();
        // actorSub$ = undefined;
        // unsubscribeFromCells();
        value$.complete();
        collisionLoopService.tick$.unsubscribe();
      },
      value$: value$.asObservable()
    }
  };
}
