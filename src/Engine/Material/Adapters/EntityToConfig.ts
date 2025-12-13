import type { MaterialJSON } from 'three';

import type { TMaterialConfig, TMaterialWrapper } from '@/Engine/Material/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function materialToConfig(entity: TMaterialWrapper): TMaterialConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);
  const json: MaterialJSON = entity.entity.toJSON();

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    ...extractSerializableRegistrableFields(entity)
  }) as any;
}
