import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParamsFsm } from '@/Engine/Fsm/Adapters';
import type { TFsmFactory, TFsmParams, TFsmWrapper } from '@/Engine/Fsm/Models';
import { FsmWrapper } from '@/Engine/Fsm/Wrappers';

const factory: TReactiveFactory<TFsmWrapper, TFsmParams> = ReactiveFactory(FactoryType.Fsm, FsmWrapper);
export const FsmFactory = (): TFsmFactory => ({ ...factory, configToParams: configToParamsFsm });
