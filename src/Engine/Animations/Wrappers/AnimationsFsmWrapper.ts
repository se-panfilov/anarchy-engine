import type { Subscription } from 'rxjs';
import type { Actor as ActorFsm, ActorLogic as ActorFsmLogic } from 'xstate';
import { createActor, createMachine } from 'xstate';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TAnimationsFsmParams, TAnimationsFsmWrapper } from '@/Engine/Animations/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { omitInArray } from '@/Engine/Utils';

export function AnimationsFsmWrapper(params: TAnimationsFsmParams): TAnimationsFsmWrapper {
  // TODO 9.3.0 STATE: fix any
  const entity: ActorFsmLogic<any, any> = createMachine(params);
  let instances: ReadonlyArray<string> = [];

  const registerInstance = (id: string): void => void (instances = [...instances, id]);
  const unRegisterInstance = (id: string): void => void (instances = omitInArray(instances, id));
  const getInstances = (): ReadonlyArray<string> => [...instances];

  // TODO 9.3.0 STATE: fix any
  function createActorFsm(): ActorFsm<ActorFsmLogic<any, any>> {
    const result = createActor(entity).start();
    registerInstance(result.id);
    return result;
  }

  // TODO 9.3.0 STATE: fix any
  const wrapper: TWrapper<ActorFsmLogic<any, any>> = AbstractWrapper(entity, WrapperType.Fog, params);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    // TODO DESTROY: implement destroy
    throw new Error('Fog destroy not implemented');
  });

  return { ...wrapper, entity, createActorFsm, registerInstance, unRegisterInstance, getInstances, ...destroyable };
}
