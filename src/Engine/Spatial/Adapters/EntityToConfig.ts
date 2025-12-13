import type { TActor, TSpatialCellId } from '@/Engine';
import type { TSpatialCellSerializedData, TSpatialCellWrapper, TSpatialGridConfig, TSpatialGridWrapper } from '@/Engine/Spatial/Models';

export function entityToConfigSpatialGrid(entity: TSpatialGridWrapper): TSpatialGridConfig {
  // TODO 15-0-0: implement
  // TODO 15-0-0: Not sure if we need an adapter for SpatialCellWrapper

  return {};
}

export function entityToConfigSpatialCell(entity: TSpatialCellWrapper): TSpatialCellSerializedData {
  const { minX, minY, maxX, maxY, version } = entity;
  const objects: ReadonlyArray<string> = entity.getObjects().map((v: TActor): string => v.id);
  const id: string = entity.id as TSpatialCellId;
  // TODO 15-0-0: implement
  // TODO 15-0-0: Not sure if we need an adapter for SpatialCellWrapper

  return { id, minX, minY, maxX, maxY, objects, version };
}
