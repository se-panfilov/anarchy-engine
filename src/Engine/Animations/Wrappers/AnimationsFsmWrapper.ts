import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { StateMachine, t } from 'typescript-fsm';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TAnimationsFsmMachine, TAnimationsFsmParams, TAnimationsFsmWrapper, TEventsFsm, TStatesFsm } from '@/Engine/Animations/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function AnimationsFsmWrapper(params: TAnimationsFsmParams): TAnimationsFsmWrapper {
  const changed$: BehaviorSubject<TStatesFsm> = new BehaviorSubject<TStatesFsm>(params.initial);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, ...machineParams } = params;

  const onChange = (val: TStatesFsm): void => changed$.next(val);

  const entity: TAnimationsFsmMachine = new StateMachine<TStatesFsm, TEventsFsm>(
    machineParams.initial,
    machineParams.transitions.map(([from, to, event]) => {
      return t(from, to, event, (): void => onChange(to));
    })
  );

  const wrapper: TWrapper<TAnimationsFsmMachine> = AbstractWrapper(entity, WrapperType.AnimationsFsm, params);

  const getState = (): TStatesFsm => entity.getState();

  let prev: TStatesFsm = entity.getState();
  const send = (event: TStatesFsm): void => {
    if (entity.getState() === event) return;

    //this is a hack to prevent double dispatching of the same event. getState() is not updated immediately after dispatch
    if (prev === event) return;
    prev = event;

    void entity.dispatch(event);
  };

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    changed$.complete();
    changed$.unsubscribe();
  });

  return { ...wrapper, entity, changed$: changed$.asObservable(), send, getState, ...destroyable };
}
