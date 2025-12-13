import { Subject } from 'rxjs';

import type { TActorParams } from '@/Engine/Actor';
import type { TSpatialCellWrapper, TSpatialGridWrapper } from '@/Engine/Spatial';
import { SpatialUpdatePriority } from '@/Engine/Spatial';
import type { TSpatialData, TWithSpatial } from '@/Engine/Spatial/Models';
import type { TWriteable } from '@/Engine/Utils';

export function withSpatial(params: TActorParams): TWithSpatial {
  let _isAutoUpdate: boolean = params.spatial.isAutoUpdate;
  const cellsChanged$: Subject<ReadonlyArray<TSpatialCellWrapper>> = new Subject<ReadonlyArray<TSpatialCellWrapper>>();

  return {
    spatial: {
      data: {
        updatePriority: params.spatial.updatePriority ?? SpatialUpdatePriority.LOW,
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
      setSpatialUpdatePriority(value: SpatialUpdatePriority): void {
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TSpatialData>).updatePriority = value;
      },
      getSpatialUpdatePriority(): SpatialUpdatePriority {
        return this.data.updatePriority;
      },
      isAutoUpdate(): boolean {
        return _isAutoUpdate;
      },
      setAutoUpdate(value: boolean): void {
        _isAutoUpdate = value;
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
      destroy(): void {
        this.resetGrid();
        this.resetSpatialCells();
        cellsChanged$.complete();
      },
      cellsChanged$: cellsChanged$.asObservable()
    }
  };
}
