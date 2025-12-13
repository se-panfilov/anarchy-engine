import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { Loop } from '@Anarchy/Engine/Loop/Entities';
import type { TLoopFactory } from '@Anarchy/Engine/Loop/Models';

export function LoopFactory(): TLoopFactory {
  return ReactiveFactory(FactoryType.Loop, Loop);
}
