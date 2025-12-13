import type { Subscription } from 'rxjs';
import { BehaviorSubject, concatMap, exhaustMap, filter, mergeMap, switchMap } from 'rxjs';
import { StateMachine, t } from 'typescript-fsm';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { FsmEventsStrategy } from '@/Engine/Fsm/Constants';
import type { TFsmEvents, TFsmMachine, TFsmParams, TFsmStates, TFsmWrapper } from '@/Engine/Fsm/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

type TStrategyType = typeof concatMap | typeof exhaustMap | typeof switchMap | typeof mergeMap;

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

  const strategy$: BehaviorSubject<FsmEventsStrategy> = new BehaviorSubject<FsmEventsStrategy>(params.strategy ?? FsmEventsStrategy.SkipPending);
  const strategyOperator$: BehaviorSubject<TStrategyType> = new BehaviorSubject<TStrategyType>(getStrategyOperator(strategy$.value));

  const strategySub$: Subscription = strategy$.subscribe((strategy: FsmEventsStrategy): void => strategyOperator$.next(getStrategyOperator(strategy)));

  function getStrategyOperator(strategy: FsmEventsStrategy): TStrategyType {
    switch (strategy) {
      case FsmEventsStrategy.StrictQueue:
        return concatMap;
      case FsmEventsStrategy.SkipPending:
        return exhaustMap;
      case FsmEventsStrategy.ReplacePending:
        return switchMap;
      case FsmEventsStrategy.RunParallel:
        return mergeMap;
      default:
        throw new Error(`Unknown strategy: ${strategy}`);
    }
  }

  const wrapper: TWrapper<TFsmMachine> = AbstractWrapper(entity, WrapperType.Fsm, params);

  const getState = (): TFsmStates => entity.getState();

  const send$: BehaviorSubject<TFsmStates> = new BehaviorSubject<TFsmStates>(entity.getState());
  const sendSub$: Subscription = strategyOperator$
    .pipe(
      switchMap((operator: TStrategyType) =>
        send$.pipe(
          filter((event: TFsmStates): boolean => event !== entity.getState()),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call
          (operator as any)((event: TFsmEvents): Promise<void> => entity.dispatch(event))
        )
      )
    )
    .subscribe();

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    sendSub$.unsubscribe();
    strategySub$.unsubscribe();

    changed$.complete();
    changed$.unsubscribe();

    strategy$.complete();
    strategy$.unsubscribe();

    strategyOperator$.complete();
    strategyOperator$.unsubscribe();

    send$.complete();
    send$.unsubscribe();
  });

  return { ...wrapper, entity, type: params.type, changed$: changed$.asObservable(), send$, strategy$, getState, ...destroyable };
}
