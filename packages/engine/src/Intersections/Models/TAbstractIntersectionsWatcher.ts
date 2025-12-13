import type { Raycaster } from 'three';

import type { TWatcher } from '@/Abstract';
import type { TActor } from '@/Actor';
import type { TRawModel3d } from '@/Models3d';

import type { TIntersectionEvent } from './TIntersectionEvent';
import type { TIntersectionsLoop } from './TIntersectionsLoop';

export type TAbstractIntersectionsWatcher = TWatcher<TIntersectionEvent> &
  Readonly<{
    addActor: (actor: TActor) => void;
    addActors: (actors: ReadonlyArray<TActor> | ReadonlyMap<string, TActor>) => void;
    getActors: () => ReadonlyMap<string, TActor>;
    getIntersectionsLoop: () => TIntersectionsLoop;
    isAutoStart: boolean;
    isStarted: boolean;
    removeActor: (actor: TActor) => void;
    removeActors: (actors: ReadonlyArray<TActor> | Map<string, TActor>) => void;
    removeActorById: (actorId: string) => void;
    removeActorsByIds: (actorsIds: ReadonlyArray<string>) => void;
    getModelsFromActors: () => Array<TRawModel3d>;
    setFar: (far: number) => void;
    raycaster: Readonly<Raycaster>;
  }>;
