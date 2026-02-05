import type { LoopUpdatePriority } from '@hellpig/anarchy-engine/Loop';

export type TCollisionsData = Readonly<{
  updatePriority: LoopUpdatePriority;
}>;
