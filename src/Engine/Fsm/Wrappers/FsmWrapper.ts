import type { Subscription } from 'rxjs';
import { BehaviorSubject, concatMap, exhaustMap, filter, mergeMap, switchMap, takeUntil } from 'rxjs';
import { StateMachine, t } from 'typescript-fsm';

import type { TAbstractWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { entityToConfig } from '@/Engine/Fsm/Adapters';
import { FsmEventsStrategy } from '@/Engine/Fsm/Constants';
import type { TFsmConfig, TFsmEvents, TFsmMachine, TFsmParams, TFsmStates, TFsmWrapper } from '@/Engine/Fsm/Models';

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

  const wrapper: TAbstractWrapper<TFsmMachine> = AbstractWrapper(entity, WrapperType.Fsm, params);

  strategy$.pipe(takeUntil(wrapper.destroy$)).subscribe((strategy: FsmEventsStrategy): void => strategyOperator$.next(getStrategyOperator(strategy)));

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

  const getState = (): TFsmStates => entity.getState();

  const send$: BehaviorSubject<TFsmStates> = new BehaviorSubject<TFsmStates>(entity.getState());
  const sendSub$: Subscription = strategyOperator$
    .pipe(
      switchMap((operator: TStrategyType) =>
        send$.pipe(
          filter((event: TFsmStates): boolean => event !== entity.getState()),
          (operator as any)((event: TFsmEvents): Promise<void> => entity.dispatch(event))
        )
      )
    )
    .subscribe();

  const destroySub$: Subscription = wrapper.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    sendSub$.unsubscribe();

    changed$.complete();

    strategy$.complete();

    strategyOperator$.complete();

    send$.complete();
  });

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(wrapper, {
    entity,
    type: params.type,
    changed$: changed$.asObservable(),
    send$,
    strategy$,
    getState,
    serialize: (): TFsmConfig => entityToConfig(result)
  });

  return result;
}
