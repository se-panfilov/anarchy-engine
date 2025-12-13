import type { TActor } from '@Anarchy/Engine/Actor';
import { extractSerializableRegistrableFields } from '@Anarchy/Engine/Mixins';
import type { TSpatialCellId, TSpatialCellSerializedData, TSpatialCellWrapper, TSpatialGridConfig, TSpatialGridWrapper } from '@Anarchy/Engine/Spatial/Models';
import { filterOutEmptyFields } from '@Anarchy/Shared/Utils';

export function entityToConfigSpatialGrid(entity: TSpatialGridWrapper): TSpatialGridConfig {
  return filterOutEmptyFields({
    ...entity.getParams(),
    ...extractSerializableRegistrableFields(entity)
  });
}

export function entityToConfigSpatialCell(entity: TSpatialCellWrapper): TSpatialCellSerializedData {
  const { minX, minY, maxX, maxY } = entity;
  const objects: ReadonlyArray<string> = entity.getObjects().map((v: TActor): string => v.id);
  const id: TSpatialCellId = entity.id as TSpatialCellId;
  return filterOutEmptyFields({ id, minX, minY, maxX, maxY, objects, version: entity.getVersion() });
}
