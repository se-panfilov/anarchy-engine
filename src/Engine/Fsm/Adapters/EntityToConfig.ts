import type { TFsmConfig, TFsmWrapper } from '@/Engine/Fsm/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

// TODO 15-0-0: validate result
export function fsmToConfig(entity: TFsmWrapper): TFsmConfig {
  return filterOutEmptyFields({
    initial: entity.getInitial(),
    currentState: entity.getState(),
    transitions: entity.getTransitions(),
    type: entity.type,
    strategy: entity.strategy$.value,
    ...extractSerializableRegistrableFields(entity)
  }) as any;
}
