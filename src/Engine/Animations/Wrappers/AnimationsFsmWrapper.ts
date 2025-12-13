import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { StateMachine, t } from 'typescript-fsm';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TAnimationsFsmMachine, TAnimationsFsmParams, TAnimationsFsmWrapper } from '@/Engine/Animations/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

// export function AnimationsFsmWrapper<TStates extends string | number | symbol, TEvents extends string | number | symbol>(params: TAnimationsFsmParams): TAnimationsFsmWrapper {
export function AnimationsFsmWrapper(params: TAnimationsFsmParams): TAnimationsFsmWrapper {
  const changed$: BehaviorSubject<string | number | symbol> = new BehaviorSubject<string | number | symbol>(params.initial);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, ...machineParams } = params;

  const onChange = (val: string | number | symbol): void => changed$.next(val);

  const entity: TAnimationsFsmMachine = new StateMachine<string | number | symbol, string | number | symbol>(
    machineParams.initial,
    machineParams.transitions.map(([from, to, event]) => {
      return t(from, to, event, (): void => onChange(to));
    })
  );

  const wrapper: TWrapper<TAnimationsFsmMachine> = AbstractWrapper(entity, WrapperType.AnimationsFsm, params);

  const getState = (): string | number | symbol => entity.getState();

  let prev: string | number | symbol = entity.getState();
  const send = (event: string | number | symbol): void => {
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
