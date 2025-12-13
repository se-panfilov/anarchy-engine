import type { TFsmConfig, TFsmWrapper } from '@/Fsm/Models';
import { extractSerializableRegistrableFields } from '@/Mixins';
import { filterOutEmptyFields } from '@/Utils';

export function fsmToConfig(entity: TFsmWrapper): TFsmConfig {
  return filterOutEmptyFields({
    initial: entity.getInitial(),
    currentState: entity.getState(),
    transitions: entity.getTransitions(),
    type: entity.type,
    strategy: entity.strategy$.value,
    ...extractSerializableRegistrableFields(entity)
  });
}
