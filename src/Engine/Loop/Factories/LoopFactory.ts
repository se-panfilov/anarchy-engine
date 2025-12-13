import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { Loop } from '@/Engine/Loop/Entities';
import { LoopWithMaxPriority } from '@/Engine/Loop/Entities/LoopWithPriorities';
import type { TLoop, TLoopFactory, TLoopParams, TLoopWithPriority } from '@/Engine/Loop/Models';
import { isDefined } from '@/Engine/Utils';

function createLoop(params: TLoopParams): TLoop | TLoopWithPriority {
  return isDefined(params.maxPriority) ? LoopWithMaxPriority(params) : Loop(params);
}

const factory: TReactiveFactory<TLoop, TLoopParams> = ReactiveFactory(FactoryType.Loop, createLoop);
export const LoopFactory = (): TLoopFactory => ({ ...factory });
