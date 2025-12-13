import type { TWatcher } from '@/Engine/Abstract';
import type { TActor } from '@/Engine/Actor';

import type { TIntersectionEvent } from './TIntersectionEvent';
import type { TIntersectionsLoop } from './TIntersectionsLoop';

export type TAbstractIntersectionsWatcher = TWatcher<TIntersectionEvent> &
  Readonly<{
    addActor: (actor: TActor) => void;
    addActors: (actors: ReadonlyArray<TActor>) => void;
    getActors: () => ReadonlyArray<TActor>;
    getIntersectionsLoop: () => TIntersectionsLoop;
    isAutoStart: boolean;
    isStarted: boolean;
    removeActor: (actorId: string) => void;
    removeActors: (actorIds: ReadonlyArray<string>) => void;
  }>;
