import type { FogJSON } from 'three';

import type { TFogConfig, TFogWrapper } from '@/Engine/Fog/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function fogToConfig(entity: TFogWrapper): TFogConfig {
  const json: FogJSON = entity.entity.toJSON();

  return filterOutEmptyFields({
    color: entity.entity.color.getHexString(),
    near: json.near,
    far: json.far,
    ...extractSerializableRegistrableFields(entity)
  });
}
