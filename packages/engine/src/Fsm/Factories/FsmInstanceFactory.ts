import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParamsFsm } from '@/Fsm/Adapters';
import type { TFsmInstanceFactory, TFsmParams, TFsmWrapper } from '@/Fsm/Models';
import { FsmWrapper } from '@/Fsm/Wrappers';

export function FsmInstanceFactory(): TFsmInstanceFactory {
  const factory: TReactiveFactory<TFsmWrapper, TFsmParams> = ReactiveFactory(FactoryType.FsmInstance, FsmWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: configToParamsFsm });
}
