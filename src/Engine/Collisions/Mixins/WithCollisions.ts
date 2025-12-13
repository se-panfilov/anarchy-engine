import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, EMPTY, Subject, switchMap } from 'rxjs';

import type { TActor, TActorParams } from '@/Engine/Actor';
import { CollisionsUpdatePriority } from '@/Engine/Collisions/Constants';
import type { TCollisionCheckResult, TCollisionsData, TCollisionsLoopService, TCollisionsLoopServiceValue, TCollisionsService, TWithCollisions } from '@/Engine/Collisions/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSpatialCellWrapper } from '@/Engine/Spatial';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export function withCollisions(params: TActorParams, collisionsService: TCollisionsService, collisionsLoopService: TCollisionsLoopService): TWithCollisions {
  const autoUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.collisions?.isAutoUpdate ?? false);
  const value$: Subject<TCollisionCheckResult> = new Subject<TCollisionCheckResult>();
  let collisionsLoopServiceSub$: Subscription;
  let filterFn: ((o: TActor) => boolean) | undefined = undefined;

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    value$.complete();
    value$.unsubscribe();
    collisionsLoopServiceSub$.unsubscribe();
  });

  // TODO test this code (should work)
  function getActorsToCheck(actor: TActor): ReadonlyArray<TActor> {
    const cells: ReadonlyArray<TSpatialCellWrapper> = actor.spatial.getSpatialCells();
    if (cells.length > 0) {
      const objects = actor.spatial.getSpatialCells().flatMap((cell: TSpatialCellWrapper): ReadonlyArray<TActor> => cell.getObjects());
      return isDefined(filterFn) ? objects.filter(filterFn) : objects;
    }
    return [];
    // TODO this code is probably an extra overcomplicated corner case
    // const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName(gridName);
    // if (isNotDefined(grid)) throw new Error(`Cannot check collisions for actor (id: "${actor.id}", name: "${actor.name}"): actor doesn't belong to spatial grid, and no grid name with name "${gridName}" exists`);
    // return grid.findCellsByActorBox(actor).flatMap((cell: TSpatialCellWrapper): ReadonlyArray<TActor> => cell.getObjects());
  }

  return {
    collisions: {
      data: {
        updatePriority: params.collisions?.updatePriority ?? CollisionsUpdatePriority.LOW
      },
      start(actor: TActor): void {
        const collisionsInterpolationLengthMultiplier: number = 4;
        collisionsLoopServiceSub$ = autoUpdate$
          .pipe(switchMap((isAutoUpdate: boolean): Subject<TCollisionsLoopServiceValue> | Observable<never> => (isAutoUpdate ? collisionsLoopService.tick$ : EMPTY)))
          .subscribe(({ delta, priority }): void => {
            if (priority < this.getCollisionsUpdatePriority()) return;

            // TODO should be possible to check collisions against another grid
            const collision: TCollisionCheckResult | undefined = collisionsService.checkCollisions(actor, getActorsToCheck(actor), collisionsInterpolationLengthMultiplier, delta);
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
      setCollisionsFilterFn(fn: (actor: TActor) => boolean): void {
        filterFn = fn;
      },
      getCollisionsUpdatePriority(): CollisionsUpdatePriority {
        return this.data.updatePriority;
      },
      ...destroyable,
      autoUpdate$,
      value$: value$.asObservable()
    }
  };
}
