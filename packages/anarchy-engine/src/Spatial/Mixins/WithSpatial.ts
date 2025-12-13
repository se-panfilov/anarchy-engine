import type { TActorParams } from '@Anarchy/Engine/Actor';
import { LoopUpdatePriority } from '@Anarchy/Engine/Loop';
import type { TDestroyable } from '@Anarchy/Engine/Mixins';
import { destroyableMixin } from '@Anarchy/Engine/Mixins';
import type { TSpatialCellWrapper, TSpatialData, TSpatialGridWrapper, TWithSpatial } from '@Anarchy/Engine/Spatial/Models';
import type { TWriteable } from '@Anarchy/Shared/Utils';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

export function withSpatial(params: TActorParams): TWithSpatial {
  const autoUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.spatial.isAutoUpdate);
  const cellsChanged$: Subject<ReadonlyArray<TSpatialCellWrapper>> = new Subject<ReadonlyArray<TSpatialCellWrapper>>();

  const destroyable: TDestroyable = destroyableMixin();

  const result: TWithSpatial = {
    spatial: {
      data: {
        updatePriority: params.spatial.updatePriority ?? LoopUpdatePriority.LOW,
        grid: params.spatial.grid || undefined,
        cells: []
      },
      setData({ updatePriority, cells }: TSpatialData): void {
        this.setSpatialUpdatePriority(updatePriority);
        this.setSpatialCells(cells);
      },
      getData(): TSpatialData {
        return this.data;
      },
      setSpatialUpdatePriority(value: LoopUpdatePriority): void {
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TSpatialData>).updatePriority = value;
      },
      getSpatialUpdatePriority(): LoopUpdatePriority {
        return this.data.updatePriority;
      },
      setGrid(grid: TSpatialGridWrapper): void {
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TSpatialData>).grid = grid;
      },
      getGrid(): TSpatialGridWrapper | undefined {
        return this.data.grid;
      },
      resetGrid(): void {
        this.setGrid(undefined as unknown as TSpatialGridWrapper);
      },
      getSpatialCells(): ReadonlyArray<TSpatialCellWrapper> {
        return this.data.cells;
      },
      setSpatialCells(cells: ReadonlyArray<TSpatialCellWrapper>): void {
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TSpatialData>).cells = cells;
        cellsChanged$.next(cells);
      },
      resetSpatialCells(): void {
        this.setSpatialCells([]);
      },
      ...destroyable,
      autoUpdate$,
      cellsChanged$: cellsChanged$.asObservable()
    }
  };

  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    result.spatial.resetGrid();
    result.spatial.resetSpatialCells();
    cellsChanged$.complete();
  });

  return result;
}
