import type { TWatcher } from '@/Engine/Abstract';
import type { TActorWrapper } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';

import type { TIntersectionEvent } from './TIntersectionEvent';

export type TIntersectionsWatcher = Omit<TWatcher<TIntersectionEvent>, 'start' | 'stop'> &
  Readonly<{
    addActors: (actorWrappers: ReadonlyArray<TActorWrapper>) => void;
    addActor: (actorWrapper: TActorWrapper) => void;
    getActors: () => ReadonlyArray<TActorWrapper>;
    removeActors: (actorWrapperIds: ReadonlyArray<string>) => void;
    removeActor: (actorWrapperId: string) => void;
    setCamera: (cam: TCameraWrapper) => void;
    getCamera: () => TCameraWrapper | undefined;
    start: () => TIntersectionsWatcher;
    stop: () => TIntersectionsWatcher;
    isStarted: boolean;
    isAutoStart: boolean;
  }>;
