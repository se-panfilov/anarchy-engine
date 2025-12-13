import type { Subscription } from 'rxjs';
import { createMachine } from 'xstate';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TAnimationsFsm, TAnimationsFsmParams, TAnimationsFsmWrapper } from '@/Engine/Animations/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function TAnimationsFsmWrapper(params: TAnimationsFsmParams): TAnimationsFsmWrapper {
  const entity: TAnimationsFsm = createMachine(params);

  const wrapper: TWrapper<TAnimationsFsm> = AbstractWrapper(entity, WrapperType.Fog, params);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    // TODO DESTROY: implement destroy
    throw new Error('Fog destroy not implemented');
  });

  return { ...wrapper, entity, ...destroyable };
}
