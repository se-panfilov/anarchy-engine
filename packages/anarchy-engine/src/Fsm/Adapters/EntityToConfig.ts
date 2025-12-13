import type { TFsmConfig, TFsmWrapper } from '@Anarchy/Engine/Fsm/Models';
import { extractSerializableRegistrableFields } from '@Anarchy/Engine/Mixins';
import { filterOutEmptyFields } from '@Anarchy/Shared/Utils';

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
