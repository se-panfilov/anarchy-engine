import type { IWatcher } from '@/Engine/Abstract';
import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';

import type { IIntersectionEvent } from './IIntersectionEvent';

export type IIntersectionsWatcher = Omit<IWatcher<IIntersectionEvent>, 'start' | 'stop'> &
  Readonly<{
    start: (camera: Readonly<ICameraWrapper>) => IIntersectionsWatcher;
    stop: () => IIntersectionsWatcher;
    addActors: (actorsWrappers: ReadonlyArray<IActorWrapperAsync>) => void;
    removeActors: (actorsWrapperIds: ReadonlyArray<string>) => void;
  }>;
