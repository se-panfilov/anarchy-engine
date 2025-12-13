import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TTextAnyWrapper, TTextConfig } from '@/Engine/Text/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function textToConfig(entity: TTextAnyWrapper): TTextConfig {
  const { drive } = entity;
  // TODO 15-0-0: implement
  // TODO 15-0-0: Check if we need distinct adapters for each type of text

  const json = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
    // TODO 15-0-0: fix any
  }) as any;
}
