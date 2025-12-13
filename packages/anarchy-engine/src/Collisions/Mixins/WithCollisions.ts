import type { TActor, TActorParams } from '@Anarchy/Engine/Actor';
import type { TCollisionCheckResult, TCollisionsData, TCollisionsLoop, TCollisionsService, TWithCollisions } from '@Anarchy/Engine/Collisions/Models';
import { LoopUpdatePriority } from '@Anarchy/Engine/Loop';
import type { TMilliseconds } from '@Anarchy/Engine/Math';
import type { TDestroyable } from '@Anarchy/Engine/Mixins';
import { destroyableMixin } from '@Anarchy/Engine/Mixins';
import type { TSpatialCellWrapper } from '@Anarchy/Engine/Spatial';
import type { TWriteable } from '@Shared/Utils';
import { isDefined, removeDuplicates } from '@Shared/Utils';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, EMPTY, filter, Subject, switchMap } from 'rxjs';

export function withCollisions(params: TActorParams, collisionsService: TCollisionsService, collisionsLoop: TCollisionsLoop): TWithCollisions {
  const autoUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.collisions?.isAutoUpdate ?? false);
  const value$: Subject<TCollisionCheckResult> = new Subject<TCollisionCheckResult>();
  let collisionsLoopSub$: Subscription;
  let filterFn: ((o: TActor) => boolean) | undefined = undefined;

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    autoUpdate$.complete();
    value$.complete();
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
    // const grid: TSpatialGridWrapper = spatialGridService.getRegistry().getByName(gridName);
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
