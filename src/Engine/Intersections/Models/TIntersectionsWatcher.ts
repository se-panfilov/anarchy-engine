import type { TWatcher } from '@/Engine/Abstract';
import type { TActor } from '@/Engine/Actor';
import type { TAnyCameraWrapper } from '@/Engine/Camera';

import type { TIntersectionEvent } from './TIntersectionEvent';
import type { TIntersectionsLoop } from './TIntersectionsLoop';

export type TIntersectionsWatcher = TWatcher<TIntersectionEvent> &
  Readonly<{
    addActor: (actor: TActor) => void;
    addActors: (actors: ReadonlyArray<TActor>) => void;
    findCamera: () => TAnyCameraWrapper | undefined;
    getActors: () => ReadonlyArray<TActor>;
    getCamera: () => TAnyCameraWrapper | never;
    getIntersectionsLoop: () => TIntersectionsLoop;
    isAutoStart: boolean;
    isStarted: boolean;
    removeActor: (actorId: string) => void;
    removeActors: (actorIds: ReadonlyArray<string>) => void;
    setCamera: (cam: TAnyCameraWrapper) => void;
  }>;
