import type { TActor } from '@/Engine/Actor';
import type { CollisionsUpdatePriority } from '@/Engine/Collisions/Constants';

import type { TCollisionsData } from './TCollisionsData';

export type TCollisionsMethods = Readonly<{
  start: (actor: TActor) => void;
  isAutoUpdate: () => boolean;
  setAutoUpdate: (value: boolean) => void;
  setCollisionsUpdatePriority: (priority: CollisionsUpdatePriority) => void;
  setCollisionsFilterFn: (filterFn: (actor: TActor) => boolean) => void;
  getCollisionsUpdatePriority: () => CollisionsUpdatePriority;
  setData: (data: TCollisionsData) => void;
  getData: () => TCollisionsData;
}>;
