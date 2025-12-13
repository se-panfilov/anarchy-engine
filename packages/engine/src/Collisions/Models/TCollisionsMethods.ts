import type { TActor } from '@/Engine/Actor';
import type { LoopUpdatePriority } from '@/Engine/Loop';

import type { TCollisionsData } from './TCollisionsData';

export type TCollisionsMethods = Readonly<{
  start: (actor: TActor) => void;
  setCollisionsUpdatePriority: (priority: LoopUpdatePriority) => void;
  setCollisionsFilterFn: (filterFn: (actor: TActor) => boolean) => void;
  getCollisionsUpdatePriority: () => LoopUpdatePriority;
  setData: (data: TCollisionsData) => void;
  getData: () => TCollisionsData;
}>;
