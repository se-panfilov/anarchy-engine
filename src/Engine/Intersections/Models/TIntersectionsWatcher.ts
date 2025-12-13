import type { TWatcher } from '@/Engine/Abstract';
import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';

import type { TIntersectionEvent } from './TIntersectionEvent';

export type TIntersectionsWatcher = Omit<TWatcher<TIntersectionEvent>, 'start' | 'stop'> &
  Readonly<{
    addActors: (actorWrappers: ReadonlyArray<TActorWrapperAsync>) => void;
    addActor: (actorWrapper: TActorWrapperAsync) => void;
    getActors: () => ReadonlyArray<TActorWrapperAsync>;
    removeActors: (actorWrapperIds: ReadonlyArray<string>) => void;
    removeActor: (actorWrapperId: string) => void;
    setCamera: (cam: TCameraWrapper) => void;
    getCamera: () => TCameraWrapper | undefined;
    start: () => TIntersectionsWatcher;
    stop: () => TIntersectionsWatcher;
    isStarted: boolean;
    isAutoStart: boolean;
  }>;
