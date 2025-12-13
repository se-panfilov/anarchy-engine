import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TSpace, TSpaceConfig } from '@/Engine/Space/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function spaceToConfig(entity: TSpace): TSpaceConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    ...extractSerializableRegistrableFields(entity)
  }) as any;
}
