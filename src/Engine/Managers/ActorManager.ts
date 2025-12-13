import { ActorWrapper } from '@Engine/Wrappers/ActorWrapper';
import type { ActorParams } from '@Engine/Wrappers/ActorWrapper';
import { AbstractManager } from '@Engine/Managers/AbstractManager';

export class ActorManager extends AbstractManager<ActorWrapper> {
  public create(params: ActorParams): ActorWrapper {
    // const params: ActorParams = {
    //   type: 'sphere',
    //   width: 1,
    //   height: 32,
    //   heightSegments: 32,
    //   materialParams: { color: new Color('#5EDCAE') }
    // };
    const wrappedActor = new ActorWrapper(params);
    wrappedActor.entity.position.set(0, 2, 0);
    wrappedActor.entity.castShadow = true;
    this.list$.next([...this.list$.value, wrappedActor]);

    return wrappedActor;
  }
}
