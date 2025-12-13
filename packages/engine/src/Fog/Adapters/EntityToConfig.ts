import type { FogJSON } from 'three';

import { serializeColor } from '@/Color';
import type { TFogConfig, TFogWrapper } from '@/Fog/Models';
import { extractSerializableRegistrableFields } from '@/Mixins';
import { filterOutEmptyFields } from '@/Utils';

export function fogToConfig(entity: TFogWrapper): TFogConfig {
  const json: FogJSON = entity.entity.toJSON();

  return filterOutEmptyFields({
    color: serializeColor(entity.entity.color),
    near: json.near,
    far: json.far,
    ...extractSerializableRegistrableFields(entity)
  });
}
