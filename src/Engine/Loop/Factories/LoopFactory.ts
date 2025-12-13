import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { Loop } from '@/Engine/Loop/Entities';
import type { TLoop, TLoopFactory, TLoopParams } from '@/Engine/Loop/Models';

const factory: TReactiveFactory<TLoop, TLoopParams> = ReactiveFactory(FactoryType.Loop, Loop);
// eslint-disable-next-line functional/immutable-data
export const LoopFactory = (): TLoopFactory => Object.assign(factory, {});
