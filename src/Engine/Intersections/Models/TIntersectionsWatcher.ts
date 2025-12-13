import type { TAbstractWatcher } from '@/Engine/Abstract';
import type { TActor } from '@/Engine/Actor';
import type { TAnyCameraWrapper } from '@/Engine/Camera';

import type { TIntersectionEvent } from './TIntersectionEvent';

export type TIntersectionsWatcher = TAbstractWatcher<TIntersectionEvent> &
  Readonly<{
    addActors: (actors: ReadonlyArray<TActor>) => void;
    addActor: (actor: TActor) => void;
    getActors: () => ReadonlyArray<TActor>;
    removeActors: (actorIds: ReadonlyArray<string>) => void;
    removeActor: (actorId: string) => void;
    setCamera: (cam: TAnyCameraWrapper) => void;
    getCamera: () => TAnyCameraWrapper | undefined;
    isStarted: boolean;
    isAutoStart: boolean;
  }>;
