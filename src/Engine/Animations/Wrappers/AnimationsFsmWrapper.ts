import { createMachine, interpret } from 'robot3';
import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TAnimationsFsmInstance, TAnimationsFsmMachine, TAnimationsFsmParams, TAnimationsFsmState, TAnimationsFsmWrapper } from '@/Engine/Animations/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function AnimationsFsmWrapper(params: TAnimationsFsmParams): TAnimationsFsmWrapper {
  const changed$: Subject<TAnimationsFsmState> = new Subject<TAnimationsFsmState>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, ...machineParams } = params;
  const machine: TAnimationsFsmMachine = createMachine(machineParams);
  const entity: TAnimationsFsmInstance = interpret(machine, (v: TAnimationsFsmState): void => changed$.next(v));

  const wrapper: TWrapper<TAnimationsFsmInstance> = AbstractWrapper(entity, WrapperType.AnimationsFsm, params);

  function getCurrentState(): TAnimationsFsmState {
    return entity.machine.current;
  }

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    changed$.complete();
    changed$.unsubscribe();
  });

  return { ...wrapper, entity, changed$, send: entity.send, getCurrentState, ...destroyable };
}
