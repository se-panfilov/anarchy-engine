import type { ActorParams } from '@Engine/Wrappers/ActorWrapper';
import { ActorWrapper } from '@Engine/Wrappers/ActorWrapper';
import { AbstractManager } from '@Engine/Managers/AbstractManager';

export class ActorManager extends AbstractManager<ActorWrapper> {
  public create(params: ActorParams): ActorWrapper {
    const wrappedActor = new ActorWrapper(params);
    wrappedActor.setPosition(0, 2, 0);
    wrappedActor.setCastShadow(true);
    this.list$.next([...this.list$.value, wrappedActor]);

    return wrappedActor;
  }
}
