import type { IWatcher, IWithWrapperIdEntity } from '@/Engine/Abstract';
import type { IActorWrapperAsync, IMesh } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';

import type { IIntersectionEvent } from './IIntersectionEvent';

export type IIntersectionsWatcher = Omit<IWatcher<IIntersectionEvent>, 'start' | 'stop'> &
  Readonly<{
    addActors: (actorsWrappers: ReadonlyArray<IActorWrapperAsync>) => void;
    getActors: () => ReadonlyArray<IWithWrapperIdEntity<IMesh>>;
    removeActors: (actorsWrapperIds: ReadonlyArray<string>) => void;
    setCamera: (cam: Readonly<ICameraWrapper>) => void;
    getCamera: () => Readonly<ICameraWrapper> | undefined;
    start: () => IIntersectionsWatcher;
    stop: () => IIntersectionsWatcher;
  }>;
