import type { CollisionsUpdatePriority } from '@/Engine/Collisions/Constants';

export type TCollisionsData = Readonly<{
  updatePriority: CollisionsUpdatePriority;
}>;
