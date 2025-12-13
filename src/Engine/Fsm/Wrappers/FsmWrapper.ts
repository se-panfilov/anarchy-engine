import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { StateMachine, t } from 'typescript-fsm';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TFsmEvents, TFsmMachine, TFsmParams, TFsmStates, TFsmWrapper } from '@/Engine/Fsm/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function FsmWrapper(params: TFsmParams): TFsmWrapper {
  const changed$: BehaviorSubject<TFsmStates> = new BehaviorSubject<TFsmStates>(params.initial);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, ...machineParams } = params;

  const onChange = (val: TFsmStates): void => changed$.next(val);

  const entity: TFsmMachine = new StateMachine<TFsmStates, TFsmEvents>(
    machineParams.initial,
    machineParams.transitions.map(([from, to, event]) => {
      return t(from, to, event, (): void => onChange(to));
    })
  );

  const wrapper: TWrapper<TFsmMachine> = AbstractWrapper(entity, WrapperType.Fsm, params);

  const getState = (): TFsmStates => entity.getState();

  let prev: TFsmStates = entity.getState();
  const send = (event: TFsmStates): void => {
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
