import { BehaviorSubject, exhaustMap, filter, Subscription } from 'rxjs';
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

  const send$: BehaviorSubject<TFsmStates> = new BehaviorSubject<TFsmStates>(entity.getState());
  const sendSub$: Subscription = send$
    .pipe(
      filter((event: TFsmStates): boolean => event !== entity.getState()),
      exhaustMap((event: TFsmEvents): Promise<void> => entity.dispatch(event))
    )
    .subscribe();

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    sendSub$.unsubscribe();

    changed$.complete();
    changed$.unsubscribe();

    send$.complete();
    send$.unsubscribe();
  });

  return { ...wrapper, entity, type: params.type, changed$: changed$.asObservable(), send$, getState, ...destroyable };
}
