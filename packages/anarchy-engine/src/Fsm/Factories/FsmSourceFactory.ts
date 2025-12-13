import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParamsFsm } from '@Anarchy/Engine/Fsm/Adapters';
import { FsmSource } from '@Anarchy/Engine/Fsm/Entities';
import type { TFsmParams, TFsmSource, TFsmSourceFactory } from '@Anarchy/Engine/Fsm/Models';

export function FsmSourceFactory(): TFsmSourceFactory {
  const factory: TReactiveFactory<TFsmSource, TFsmParams> = ReactiveFactory(FactoryType.FsmSource, FsmSource);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: configToParamsFsm });
}
