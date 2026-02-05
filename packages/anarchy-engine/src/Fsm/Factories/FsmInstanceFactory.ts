import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { fsmConfigToParams } from '@hellpig/anarchy-engine/Fsm/Adapters';
import type { TFsmInstanceFactory, TFsmParams, TFsmWrapper } from '@hellpig/anarchy-engine/Fsm/Models';
import { FsmWrapper } from '@hellpig/anarchy-engine/Fsm/Wrappers';

export function FsmInstanceFactory(): TFsmInstanceFactory {
  const factory: TReactiveFactory<TFsmWrapper, TFsmParams> = ReactiveFactory(FactoryType.FsmInstance, FsmWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: fsmConfigToParams });
}
