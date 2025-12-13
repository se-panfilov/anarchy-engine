import type { TActorParams } from '@/Engine/Actor';
import { SpatialUpdatePriority, withSpatialCell } from '@/Engine/Spatial';
import type { TSpatialData, TWithSpatial } from '@/Engine/Spatial/Models';
import type { TWriteable } from '@/Engine/Utils';

export function withSpatial(params: TActorParams): TWithSpatial {
  let _isAutoUpdate: boolean = params.isSpatialAutoUpdate ?? false;

  return {
    spatial: {
      data: {
        updatePriority: params.spatial?.updatePriority ?? SpatialUpdatePriority.LOW,
        cell: params.spatial?.cell || undefined,
        tree: params.spatial?.tree || undefined
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
      ...withSpatialCell()
    }
  };
}
