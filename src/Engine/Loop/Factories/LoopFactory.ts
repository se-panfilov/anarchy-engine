import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { Loop } from '@/Engine/Loop/Entities';
import type { TLoopFactory } from '@/Engine/Loop/Models';

export const LoopFactory: TLoopFactory = ReactiveFactory(FactoryType.Loop, Loop);
