import type { TActor } from '@/Engine/Actor';
import { extractRegistrableFields } from '@/Engine/Mixins';
import type { TSpatialCellId, TSpatialCellSerializedData, TSpatialCellWrapper, TSpatialGridConfig, TSpatialGridWrapper } from '@/Engine/Spatial/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function entityToConfigSpatialGrid(entity: TSpatialGridWrapper): TSpatialGridConfig {
  // const { mapWidth, mapHeight, cellSize, centerX, centerZ} = entity;
  // TODO 15-0-0: implement

  return filterOutEmptyFields({
    ...extractRegistrableFields(entity)
    // mapWidth, mapHeight, cellSize, centerX, centerZ
    // TODO 15-0-0: fix any
  }) as any;
}

export function entityToConfigSpatialCell(entity: TSpatialCellWrapper): TSpatialCellSerializedData {
  const { minX, minY, maxX, maxY } = entity;
  const objects: ReadonlyArray<string> = entity.getObjects().map((v: TActor): string => v.id);
  const id: string = entity.id as TSpatialCellId;
  // TODO 15-0-0: implement
  // TODO 15-0-0: Not sure if we need an adapter for SpatialCellWrapper
  // TODO 15-0-0: fix any
  return filterOutEmptyFields({ id, minX, minY, maxX, maxY, objects, version: entity.getVersion() }) as any;
}
