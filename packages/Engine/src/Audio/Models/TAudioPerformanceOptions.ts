import type { LoopUpdatePriority } from '@/Engine/Loop';

export type TAudioPerformanceOptions = Readonly<{
  updatePriority?: LoopUpdatePriority;
}>;
