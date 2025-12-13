import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TCollisionCheckResult, TWithCollisions } from '@/Engine/Collisions/Models';
import type { TSpatialCell, TSpatialCellWrapper } from '@/Engine/Spatial';
import { isDefined } from '@/Engine/Utils';

export function withCollisions(): TWithCollisions {
  const collisions$: Subject<TCollisionCheckResult> = new Subject<TCollisionCheckResult>();
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

  // TODO (S.Panfilov) What if bullet is not in the grid? Should be still possible to get actors from a grid anyway (could have if/else and 2 checks for bullet in grid and not in grid)
  // TODO (S.Panfilov) Also remember that bullet could be bigger than 1 cell
  // TODO (S.Panfilov) test this code (should not produce memory leaks)
  let actorSub$: Subscription | undefined = actorW.spatial.cellsChanged$.subscribe((cells: ReadonlyArray<TSpatialCellWrapper>): void => {
    if (isDefined(actorSub$)) actorSub$.unsubscribe();

    unsubscribeFromCells();
    actorsToCheck = cells.flatMap((cell: TSpatialCellWrapper) => cell.getObjects()).filter((a: TActorWrapperAsync): boolean => a.id !== actorW.id);
    subscribeToCells(cells);
  });

  collisionLoopService.tick$.subscribe((): void => {
    const collision: TCollisionCheckResult | undefined = checkCollisions(actorW, radius, actorsToCheck, sceneW);
    if (isDefined(collision)) collisions$.next(collision);
  });

  return {
    destroy: (): void => {
      actorSub$?.unsubscribe();
      actorSub$ = undefined;
      unsubscribeFromCells();
      collisions$.complete();
      collisionLoopService.tick$.unsubscribe();
    },
    collisions$: collisions$.asObservable()
  };
}
