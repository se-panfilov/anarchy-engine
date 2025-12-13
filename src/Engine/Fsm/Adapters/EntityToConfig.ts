import type { TFsmConfig, TFsmWrapper } from '@/Engine/Fsm/Models';
import { extractRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function fsmToConfig(entity: TFsmWrapper): TFsmConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    ...extractRegistrableFields(entity)
  }) as any;
}
