import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, EMPTY, filter, Subject, switchMap } from 'rxjs';

import type { TActor, TActorParams } from '@/Engine/Actor';
import type { TCollisionCheckResult, TCollisionsData, TCollisionsLoop, TCollisionsService, TWithCollisions } from '@/Engine/Collisions/Models';
import { LoopUpdatePriority } from '@/Engine/Loop';
import type { TMilliseconds } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSpatialCellWrapper } from '@/Engine/Spatial';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, removeDuplicates } from '@/Engine/Utils';

export function withCollisions(params: TActorParams, collisionsService: TCollisionsService, collisionsLoop: TCollisionsLoop): TWithCollisions {
  const autoUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.collisions?.isAutoUpdate ?? false);
  const value$: Subject<TCollisionCheckResult> = new Subject<TCollisionCheckResult>();
  let collisionsLoopSub$: Subscription;
  let filterFn: ((o: TActor) => boolean) | undefined = undefined;

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    autoUpdate$.complete();
    autoUpdate$.unsubscribe();
    value$.complete();
    value$.unsubscribe();
    collisionsLoopSub$?.unsubscribe();
  });

  function getActorsToCheck(actor: TActor): ReadonlyArray<TActor> {
    const cells: ReadonlyArray<TSpatialCellWrapper> = actor.spatial.getSpatialCells();
    if (cells.length > 0) {
      const objects: ReadonlyArray<TActor> = actor.spatial.getSpatialCells().flatMap((cell: TSpatialCellWrapper): ReadonlyArray<TActor> => cell.getObjects());
      return removeDuplicates(isDefined(filterFn) ? objects.filter(filterFn) : objects);
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
        updatePriority: params.collisions?.updatePriority ?? LoopUpdatePriority.LOW
      },
      start(actor: TActor): void {
        const collisionsInterpolationLengthMultiplier: number = 4;
        collisionsLoopSub$ = autoUpdate$
          .pipe(
            switchMap((isAutoUpdate: boolean): Subject<TMilliseconds> | Observable<never> => (isAutoUpdate ? collisionsLoop.tick$ : EMPTY)),
            filter((): boolean => collisionsLoop.shouldUpdateWithPriority(this.getCollisionsUpdatePriority()))
          )
          .subscribe((delta: TMilliseconds): void => {
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
      setCollisionsUpdatePriority(value: LoopUpdatePriority): void {
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TCollisionsData>).updatePriority = value;
      },
      setCollisionsFilterFn(fn: (actor: TActor) => boolean): void {
        filterFn = fn;
      },
      getCollisionsUpdatePriority(): LoopUpdatePriority {
        return this.data.updatePriority;
      },
      ...destroyable,
      autoUpdate$,
      value$: value$.asObservable()
    }
  };
}
