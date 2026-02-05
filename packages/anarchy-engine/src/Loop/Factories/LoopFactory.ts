import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { Loop } from '@hellpig/anarchy-engine/Loop/Entities';
import type { TLoopFactory } from '@hellpig/anarchy-engine/Loop/Models';

export function LoopFactory(): TLoopFactory {
  return ReactiveFactory(FactoryType.Loop, Loop);
}
