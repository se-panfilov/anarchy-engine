import type { IWatcher } from '@/Engine/Abstract';
import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';

import type { IIntersectionEvent } from './IIntersectionEvent';

export type IIntersectionsWatcher = Omit<IWatcher<IIntersectionEvent>, 'start' | 'stop'> &
  Readonly<{
    addActors: (actorWrappers: ReadonlyArray<IActorWrapperAsync>) => void;
    addActor: (actorWrapper: IActorWrapperAsync) => void;
    getActors: () => ReadonlyArray<IActorWrapperAsync>;
    removeActors: (actorWrapperIds: ReadonlyArray<string>) => void;
    removeActor: (actorWrapperId: string) => void;
    setCamera: (cam: ICameraWrapper) => void;
    getCamera: () => ICameraWrapper | undefined;
    start: () => IIntersectionsWatcher;
    stop: () => IIntersectionsWatcher;
    isStarted: boolean;
    isAutoStart: boolean;
  }>;
