import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { fsmConfigToParams } from '@hellpig/anarchy-engine/Fsm/Adapters';
import { FsmSource } from '@hellpig/anarchy-engine/Fsm/Entities';
import type { TFsmParams, TFsmSource, TFsmSourceFactory } from '@hellpig/anarchy-engine/Fsm/Models';

export function FsmSourceFactory(): TFsmSourceFactory {
  const factory: TReactiveFactory<TFsmSource, TFsmParams> = ReactiveFactory(FactoryType.FsmSource, FsmSource);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: fsmConfigToParams });
}
