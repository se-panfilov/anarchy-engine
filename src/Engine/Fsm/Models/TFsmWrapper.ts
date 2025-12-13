import type { BehaviorSubject, Observable } from 'rxjs';

import type { TWrapper } from '@/Engine/Abstract';
import type { FsmEventsStrategy, FsmType } from '@/Engine/Fsm/Constants';
import type { TFsmEvents, TFsmStates } from '@/Engine/Fsm/Models';

import type { TFsmMachine } from './TFsmMachine';

export type TFsmWrapper = TWrapper<TFsmMachine> &
  Readonly<{
    type: FsmType | string;
    changed$: Observable<TFsmStates>;
    send$: BehaviorSubject<TFsmStates>;
    strategy$: BehaviorSubject<FsmEventsStrategy>;
    getState: () => TFsmStates;
    getInitial: () => TFsmStates;
    getTransitions: () => ReadonlyArray<readonly [TFsmStates, TFsmEvents, TFsmStates]>;
  }>;
