import type { TActorParams } from '@/Engine/Actor';
import type { TSpatialCell, TSpatialGridWrapper } from '@/Engine/Spatial';
import { SpatialUpdatePriority } from '@/Engine/Spatial';
import type { TSpatialData, TWithSpatial } from '@/Engine/Spatial/Models';
import type { TWriteable } from '@/Engine/Utils';

export function withSpatial(params: TActorParams): TWithSpatial {
  let _isAutoUpdate: boolean = params.isSpatialAutoUpdate ?? false;

  return {
    spatial: {
      data: {
        updatePriority: params.spatial?.updatePriority ?? SpatialUpdatePriority.LOW,
        grid: params.spatial?.grid || undefined,
        cells: params.spatial?.cells || []
      },
      setData({ updatePriority, cells }: TSpatialData): void {
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TSpatialData>).updatePriority = updatePriority;
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TSpatialData>).cells = cells;
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
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TSpatialData>).grid = undefined;
      },
      getSpatialCells(): ReadonlyArray<TSpatialCell> {
        return this.data.cells;
      },
      setSpatialCells(cells: ReadonlyArray<TSpatialCell>): void {
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TSpatialData>).cells = cells;
      },
      resetSpatialCells(): void {
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TSpatialData>).cells = [];
      }
    }
  };
}
