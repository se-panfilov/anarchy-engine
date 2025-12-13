import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { Loop } from '@/Engine/Loop/Entities';
import type { TLoop, TLoopFactory, TLoopParams } from '@/Engine/Loop/Models';

const factory: TReactiveFactory<TLoop, TLoopParams> = ReactiveFactory(FactoryType.Loop, Loop);
export const LoopFactory = (): TLoopFactory => ({ ...factory });
