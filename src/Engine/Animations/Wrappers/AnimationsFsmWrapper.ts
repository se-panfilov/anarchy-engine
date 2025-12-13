import type { Subscription } from 'rxjs';
import type { ActorLogic } from 'xstate';
import { createMachine } from 'xstate';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TAnimationsFsmParams, TAnimationsFsmWrapper } from '@/Engine/Animations/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function AnimationsFsmWrapper(params: TAnimationsFsmParams): TAnimationsFsmWrapper {
  // TODO 9.3.0 STATE: fix any
  const entity: ActorLogic<any, any> = createMachine(params);

  // TODO 9.3.0 STATE: fix any
  const wrapper: TWrapper<ActorLogic<any, any>> = AbstractWrapper(entity, WrapperType.Fog, params);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    // TODO DESTROY: implement destroy
    throw new Error('Fog destroy not implemented');
  });

  return { ...wrapper, entity, ...destroyable };
}
