import type { FogJSON } from 'three';

import { serializeColor } from '@/Engine/Color';
import type { TFogConfig, TFogWrapper } from '@/Engine/Fog/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function fogToConfig(entity: TFogWrapper): TFogConfig {
  const json: FogJSON = entity.entity.toJSON();

  return filterOutEmptyFields({
    color: serializeColor(entity.entity.color),
    near: json.near,
    far: json.far,
    ...extractSerializableRegistrableFields(entity)
  });
}
