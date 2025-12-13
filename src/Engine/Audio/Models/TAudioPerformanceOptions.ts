import type { LoopUpdatePriority } from '@/Engine/Loop';
import type { TMeters } from '@/Engine/Math';

export type TAudioPerformanceOptions = Readonly<{
  updatePriority?: LoopUpdatePriority;
  noiseThreshold?: TMeters;
}>;
