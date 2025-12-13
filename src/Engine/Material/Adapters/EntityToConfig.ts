import type { MaterialJSON } from 'three';

import type { TMaterialConfig, TMaterialWrapper } from '@/Engine/Material/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function materialToConfig(entity: TMaterialWrapper): TMaterialConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity material', entity);
  const json: MaterialJSON = entity.entity.toJSON();
  console.log('XXX json', json);

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    type: json.type,
    ...extractSerializableRegistrableFields(entity)
  }) as any;
}
