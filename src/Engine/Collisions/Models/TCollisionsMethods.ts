import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { CollisionsUpdatePriority } from '@/Engine/Collisions/Constants';

import type { TCollisionsData } from './TCollisionsData';

export type TCollisionsMethods = Readonly<{
  start: (actorW: TActorWrapperAsync) => void;
  isAutoUpdate: () => boolean;
  setAutoUpdate: (value: boolean) => void;
  setCollisionsUpdatePriority: (priority: CollisionsUpdatePriority) => void;
  setCollisionsFilterFn: (filterFn: (actorW: TActorWrapperAsync) => boolean) => void;
  getCollisionsUpdatePriority: () => CollisionsUpdatePriority;
  setRadius: (value: number) => void;
  getRadius: () => number;
  setData: (data: TCollisionsData) => void;
  getData: () => TCollisionsData;
}>;
