import type { TLoopWithPriority } from '@/Engine/Loop/Models';

export type TCollisionsLoop = TLoopWithPriority & { __brand: 'collisions_loop' };
