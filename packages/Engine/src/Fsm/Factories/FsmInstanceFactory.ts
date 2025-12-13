import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParamsFsm } from '@/Engine/Fsm/Adapters';
import type { TFsmInstanceFactory, TFsmParams, TFsmWrapper } from '@/Engine/Fsm/Models';
import { FsmWrapper } from '@/Engine/Fsm/Wrappers';

export function FsmInstanceFactory(): TFsmInstanceFactory {
  const factory: TReactiveFactory<TFsmWrapper, TFsmParams> = ReactiveFactory(FactoryType.FsmInstance, FsmWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: configToParamsFsm });
}
