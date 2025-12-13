import type { TReactiveFactory } from '@Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Abstract';
import { configToParamsFsm } from '@Engine/Fsm/Adapters';
import { FsmSource } from '@Engine/Fsm/Entities';
import type { TFsmParams, TFsmSource, TFsmSourceFactory } from '@Engine/Fsm/Models';

export function FsmSourceFactory(): TFsmSourceFactory {
  const factory: TReactiveFactory<TFsmSource, TFsmParams> = ReactiveFactory(FactoryType.FsmSource, FsmSource);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: configToParamsFsm });
}
