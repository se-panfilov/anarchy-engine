import type { Subscription } from 'rxjs';
import { Raycaster } from 'three';

import type { TAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { TActor } from '@/Engine/Actor';
import { intersectionsToConfig } from '@/Engine/Intersections/Adapters';
import type { TAbstractIntersectionsWatcher, TAnyIntersectionsWatcherConfig, TAnyIntersectionsWatcherParams, TIntersectionEvent, TIntersectionsLoop } from '@/Engine/Intersections/Models';
import type { TWriteable } from '@/Engine/Utils';

export function AbstractIntersectionsWatcher({ isAutoStart, tags, name, intersectionsLoop, ...rest }: TAnyIntersectionsWatcherParams): TAbstractIntersectionsWatcher {
  const abstractWatcher: TAbstractWatcher<TIntersectionEvent> = AbstractWatcher<TIntersectionEvent>(WatcherType.IntersectionWatcher, name, tags);
  let raycaster: Readonly<Raycaster> | undefined = new Raycaster();
  let actors: ReadonlyArray<TActor> = [];

  const addActors = (actorsList: ReadonlyArray<TActor>): void => void (actors = [...actors, ...actorsList]);
  const addActor = (actor: TActor): void => void (actors = [...actors, actor]);
  const getActors = (): ReadonlyArray<TActor> => actors;
  const removeActors = (actorIds: ReadonlyArray<string>): void => void (actors = actors.filter((actor: TActor): boolean => !actorIds.includes(actor.id)));
  const removeActor = (actorId: string): void => void (actors = actors.filter((actor: TActor): boolean => actorId !== actor.id));

  const getIntersectionsLoop = (): TIntersectionsLoop => intersectionsLoop;

  const destroySub$: Subscription = abstractWatcher.destroy$.subscribe((): void => {
    raycaster = null as any;
    // eslint-disable-next-line functional/immutable-data
    (actors as Array<TActor>).length = 0;

    destroySub$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  const result: TWriteable<TAbstractIntersectionsWatcher> = Object.assign(abstractWatcher, {
    addActor,
    addActors,
    getActors,
    getIntersectionsLoop,
    isAutoStart,
    isStarted: false,
    removeActor,
    removeActors,
    raycaster,
    serialize: (): TAnyIntersectionsWatcherConfig => intersectionsToConfig(result)
  });

  if (rest.actors.length > 0) addActors(rest.actors);
  if (isAutoStart) result.enabled$.next(true);

  return result;
}
