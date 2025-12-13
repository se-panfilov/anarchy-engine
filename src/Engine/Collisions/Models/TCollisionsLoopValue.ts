import type { CollisionsUpdatePriority } from '@/Engine/Collisions/Constants';

export type TCollisionsLoopValue = Readonly<{ delta: number; priority: CollisionsUpdatePriority }>;
