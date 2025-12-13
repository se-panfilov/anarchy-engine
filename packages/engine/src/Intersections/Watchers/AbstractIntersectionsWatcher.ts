import type { Subscription } from 'rxjs';
import { Raycaster } from 'three';

import type { TAbstractWatcher } from '@/Abstract';
import { AbstractWatcher, WatcherType } from '@/Abstract';
import type { TActor } from '@/Actor';
import { intersectionsToConfig } from '@/Intersections/Adapters';
import type {
  TAbstractIntersectionsWatcher,
  TAnyIntersectionsWatcher,
  TAnyIntersectionsWatcherConfig,
  TAnyIntersectionsWatcherParams,
  TIntersectionEvent,
  TIntersectionsLoop
} from '@/Intersections/Models';
import type { TRawModel3d } from '@/Models3d';
import type { TWriteable } from '@/Utils';
import { isDefined, isNotDefined } from '@/Utils';

export function AbstractIntersectionsWatcher({ isAutoStart, tags, name, intersectionsLoop, far, ...rest }: TAnyIntersectionsWatcherParams): TAbstractIntersectionsWatcher {
  const abstractWatcher: TAbstractWatcher<TIntersectionEvent> = AbstractWatcher<TIntersectionEvent>(WatcherType.IntersectionWatcher, name, tags);
  let raycaster: Raycaster | undefined = new Raycaster();
  const actors: Map<string, TActor> = new Map<string, TActor>();

  const addActors = (actorsList: ReadonlyArray<TActor> | ReadonlyMap<string, TActor>): void => actorsList.forEach(addActor);
  const addActor = (actor: TActor): void => {
    if (actors.has(actor.id))
      throw new Error(`[IntersectionsWatcher]: Cannot add actor to intersection watcher: Actor "${actor.name} "(id: "${actor.id}") already exists in the watcher "${abstractWatcher.id}"`);
    void actors.set(actor.id, actor);
  };

  const getActors = (): ReadonlyMap<string, TActor> => actors;
  const removeActors = (actors: ReadonlyArray<TActor> | ReadonlyMap<string, TActor>): void => actors.forEach(removeActor);
  const removeActorsByIds = (actorsIds: ReadonlyArray<string>): void => actorsIds.forEach(removeActorById);
  const removeActor = (actor: TActor): void => void actors.delete(actor.id);
  const removeActorById = (actorId: string): void => void actors.delete(actorId);

  const getIntersectionsLoop = (): TIntersectionsLoop => intersectionsLoop;

  function getModelsFromActors(): Array<TRawModel3d> {
    const models: TRawModel3d[] = [];
    // eslint-disable-next-line functional/no-loop-statements
    for (const actor of actors.values()) {
      // eslint-disable-next-line functional/immutable-data
      models.push(actor.model3d.getRawModel3d());
    }
    return models;
  }

  const destroySub$: Subscription = abstractWatcher.destroy$.subscribe((): void => {
    raycaster = null as any;
    actors.clear();

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
    removeActorsByIds,
    removeActorById,
    raycaster,
    getModelsFromActors,
    setFar: (far: number): void => {
      if (isNotDefined(raycaster)) throw new Error('[IntersectionsWatcher]: Cannot set far: raycaster is not defined');
      // eslint-disable-next-line functional/immutable-data
      raycaster.far = far;
    },
    serialize: (): TAnyIntersectionsWatcherConfig => intersectionsToConfig(result as TAnyIntersectionsWatcher)
  });

  // eslint-disable-next-line functional/immutable-data
  if (isDefined(far)) raycaster.far = far;
  if (rest.actors.length > 0) addActors(rest.actors);
  if (isAutoStart) result.enabled$.next(true);

  return result;
}
