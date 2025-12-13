import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from './Models/Manager';
import type { WrappedActor } from '@Engine/Actor/Models/WrappedActor';
import { ActorWrapper } from '@Engine/Actor/ActorWrapper';
import type { ActorParams } from '@Engine/Actor/Models/ActorParams';

// type ActorType = 'sphere' | 'plane';

export function ActorManager(): Manager<WrappedActor> {
  const current$ = new BehaviorSubject<WrappedActor | undefined>(undefined);
  const list$ = new BehaviorSubject<ReadonlyArray<WrappedActor>>([]);
  const destroyed$ = new Subject<void>();

  function create(params: ActorParams): WrappedActor {
    // const params: ActorParams = {
    //   type: 'sphere',
    //   width: 1,
    //   height: 32,
    //   heightSegments: 32,
    //   materialParams: { color: new Color('#5EDCAE') }
    // };
    const wrappedActor = ActorWrapper(params);
    wrappedActor.actor.position.set(0, 2, 0);
    wrappedActor.actor.castShadow = true;
    list$.next([...list$.value, wrappedActor]);

    return wrappedActor;
  }

  const setCurrent = (actor: WrappedActor): void => current$.next(actor);

  function destroy() {
    current$.complete();
    list$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `actor_manager_${nanoid()}`, create, setCurrent, current$, list$, destroy, destroyed$ };
}
