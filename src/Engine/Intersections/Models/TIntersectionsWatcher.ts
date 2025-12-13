import type { TWatcher } from '@/Engine/Abstract';
import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';

import type { IIntersectionEvent } from './IIntersectionEvent';

export type TIntersectionsWatcher = Omit<TWatcher<IIntersectionEvent>, 'start' | 'stop'> &
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
