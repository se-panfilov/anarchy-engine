import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import type { TActorParams, TActorWrapperAsync } from '@/Engine/Actor';
import { CollisionsUpdatePriority } from '@/Engine/Collisions/Constants';
import type { TCollisionCheckResult, TCollisionsData, TCollisionsLoopService, TCollisionsService, TWithCollisions } from '@/Engine/Collisions/Models';
import type { TSpatialCellWrapper } from '@/Engine/Spatial';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export function withCollisions(params: TActorParams, collisionsService: TCollisionsService, collisionsLoopService: TCollisionsLoopService): TWithCollisions {
  let _isAutoUpdate: boolean = params.isCollisionsAutoUpdate ?? false;
  const value$: Subject<TCollisionCheckResult> = new Subject<TCollisionCheckResult>();
  let collisionsLoopServiceSub$: Subscription;

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
        collisionsLoopServiceSub$ = collisionsLoopService.tick$.subscribe(({ priority }): void => {
          if (priority < this.getCollisionsUpdatePriority()) return;

          // TODO (S.Panfilov) should be possible to check collisions against another grid
          const collision: TCollisionCheckResult | undefined = collisionsService.checkCollisions(actorW, this.data.radius, getActorsToCheck(actorW));
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
        collisionsLoopServiceSub$.unsubscribe();
      },
      value$: value$.asObservable()
    }
  };
}
