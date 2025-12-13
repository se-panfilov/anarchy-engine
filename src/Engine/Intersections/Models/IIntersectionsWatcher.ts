import type { IWatcher } from '@/Engine/Abstract';
import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IVector3 } from '@/Engine/Vector';

import type { IIntersectionEvent } from './IIntersectionEvent';

export type IIntersectionsWatcher = Omit<IWatcher<IIntersectionEvent>, 'start' | 'stop'> &
  Readonly<{
    start: (actors: ReadonlyArray<IActorWrapperAsync>, camera: Readonly<ICameraWrapper>) => IIntersectionsWatcher;
    stop: () => IIntersectionsWatcher;
  }>;
