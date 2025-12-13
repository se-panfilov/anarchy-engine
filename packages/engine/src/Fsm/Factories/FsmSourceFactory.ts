import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParamsFsm } from '@/Fsm/Adapters';
import { FsmSource } from '@/Fsm/Entities';
import type { TFsmParams, TFsmSource, TFsmSourceFactory } from '@/Fsm/Models';

export function FsmSourceFactory(): TFsmSourceFactory {
  const factory: TReactiveFactory<TFsmSource, TFsmParams> = ReactiveFactory(FactoryType.FsmSource, FsmSource);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: configToParamsFsm });
}
