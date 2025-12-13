import { serializeColor } from '@Anarchy/Engine/Color';
import type { TFogConfig, TFogWrapper } from '@Anarchy/Engine/Fog/Models';
import { extractSerializableRegistrableFields } from '@Anarchy/Engine/Mixins';
import { filterOutEmptyFields } from '@Anarchy/Shared/Utils';
import type { FogJSON } from 'three';

export function fogToConfig(entity: TFogWrapper): TFogConfig {
  const json: FogJSON = entity.entity.toJSON();

  return filterOutEmptyFields({
    color: serializeColor(entity.entity.color),
    near: json.near,
    far: json.far,
    ...extractSerializableRegistrableFields(entity)
  });
}
