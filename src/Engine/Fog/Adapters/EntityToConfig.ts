import type { FogJSON } from 'three';

import type { TFogConfig, TFogWrapper } from '@/Engine/Fog/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function fogToConfig(entity: TFogWrapper): TFogConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  const json: FogJSON = entity.entity.toJSON();

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    ...extractSerializableRegistrableFields(entity)
  }) as any;
}
