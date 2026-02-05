import type { TFsmConfig, TFsmWrapper } from '@hellpig/anarchy-engine/Fsm/Models';
import { extractSerializableRegistrableFields } from '@hellpig/anarchy-engine/Mixins';
import { filterOutEmptyFields } from '@hellpig/anarchy-shared/Utils';

export function fsmEntityToConfig(entity: TFsmWrapper): TFsmConfig {
  return filterOutEmptyFields({
    initial: entity.getInitial(),
    currentState: entity.getState(),
    transitions: entity.getTransitions(),
    type: entity.type,
    strategy: entity.strategy$.value,
    ...extractSerializableRegistrableFields(entity)
  });
}
