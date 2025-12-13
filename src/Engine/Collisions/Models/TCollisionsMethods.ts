import type { TActorWrapper } from '@/Engine/Actor';
import type { CollisionsUpdatePriority } from '@/Engine/Collisions/Constants';

import type { TCollisionsData } from './TCollisionsData';

export type TCollisionsMethods = Readonly<{
  start: (actorW: TActorWrapper) => void;
  isAutoUpdate: () => boolean;
  setAutoUpdate: (value: boolean) => void;
  setCollisionsUpdatePriority: (priority: CollisionsUpdatePriority) => void;
  setCollisionsFilterFn: (filterFn: (actorW: TActorWrapper) => boolean) => void;
  getCollisionsUpdatePriority: () => CollisionsUpdatePriority;
  setData: (data: TCollisionsData) => void;
  getData: () => TCollisionsData;
}>;
