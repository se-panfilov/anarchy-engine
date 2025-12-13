import { FactoryType, ReactiveFactory } from '@Engine/Abstract';
import { Loop } from '@Engine/Loop/Entities';
import type { TLoopFactory } from '@Engine/Loop/Models';

export function LoopFactory(): TLoopFactory {
  return ReactiveFactory(FactoryType.Loop, Loop);
}
