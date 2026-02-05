import type { TActor } from '@hellpig/anarchy-engine/Actor';
import { extractSerializableRegistrableFields } from '@hellpig/anarchy-engine/Mixins';
import type { TSpatialCellId, TSpatialCellSerializedData, TSpatialCellWrapper, TSpatialGridConfig, TSpatialGridWrapper } from '@hellpig/anarchy-engine/Spatial/Models';
import { filterOutEmptyFields } from '@hellpig/anarchy-shared/Utils';

export function spatialGridEntityToConfig(entity: TSpatialGridWrapper): TSpatialGridConfig {
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
