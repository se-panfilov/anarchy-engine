import { FactoryType, ReactiveFactory } from '@/Abstract';
import { Loop } from '@/Loop/Entities';
import type { TLoopFactory } from '@/Loop/Models';

export function LoopFactory(): TLoopFactory {
  return ReactiveFactory(FactoryType.Loop, Loop);
}
