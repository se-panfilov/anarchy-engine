import { serializeColor } from '@hellpig/anarchy-engine/Color';
import type { TFogConfig, TFogWrapper } from '@hellpig/anarchy-engine/Fog/Models';
import { extractSerializableRegistrableFields } from '@hellpig/anarchy-engine/Mixins';
import { filterOutEmptyFields } from '@hellpig/anarchy-shared/Utils';
import type { FogJSON } from 'three';

export function fogEntityToConfig(entity: TFogWrapper): TFogConfig {
  const json: FogJSON = entity.entity.toJSON();

  return filterOutEmptyFields({
    color: serializeColor(entity.entity.color),
    near: json.near,
    far: json.far,
    ...extractSerializableRegistrableFields(entity)
  });
}
