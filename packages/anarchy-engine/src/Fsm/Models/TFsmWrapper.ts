import type { TWrapper } from '@hellpig/anarchy-engine/Abstract';
import type { FsmEventsStrategy, FsmType } from '@hellpig/anarchy-engine/Fsm/Constants';
import type { TFsmEvents, TFsmStates } from '@hellpig/anarchy-engine/Fsm/Models';
import type { BehaviorSubject, Observable } from 'rxjs';

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
