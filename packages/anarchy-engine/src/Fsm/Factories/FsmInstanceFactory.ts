import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParamsFsm } from '@Anarchy/Engine/Fsm/Adapters';
import type { TFsmInstanceFactory, TFsmParams, TFsmWrapper } from '@Anarchy/Engine/Fsm/Models';
import { FsmWrapper } from '@Anarchy/Engine/Fsm/Wrappers';

export function FsmInstanceFactory(): TFsmInstanceFactory {
  const factory: TReactiveFactory<TFsmWrapper, TFsmParams> = ReactiveFactory(FactoryType.FsmInstance, FsmWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: configToParamsFsm });
}
