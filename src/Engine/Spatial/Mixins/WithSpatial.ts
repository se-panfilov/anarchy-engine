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
        cell: params.spatial?.cell || undefined,
        grid: params.spatial?.grid || undefined
      },
      setData({ updatePriority, cell }: TSpatialData): void {
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TSpatialData>).updatePriority = updatePriority;
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TSpatialData>).cell = cell;
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
      getSpatialCell(): TSpatialCell | undefined {
        return this.data.cell;
      },
      setSpatialCell(newCell: TSpatialCell | undefined): void {
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TSpatialData>).cell = newCell;
      },
      resetSpatialCell(): void {
        // eslint-disable-next-line functional/immutable-data
        (this.data as TWriteable<TSpatialData>).cell = undefined;
      }
    }
  };
}
