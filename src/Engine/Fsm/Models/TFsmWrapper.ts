import type { Observable } from 'rxjs';

import type { TWrapper } from '@/Engine/Abstract';
import type { FsmType } from '@/Engine/Fsm/Constants';
import type { TFsmEvents, TFsmStates } from '@/Engine/Fsm/Models';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TFsmMachine } from './TFsmMachine';

export type TFsmWrapper = TWrapper<TFsmMachine> &
  Readonly<{
    type: FsmType | string;
    changed$: Observable<TFsmStates>;
    send: (event: TFsmEvents) => void;
    getState: () => TFsmStates;
  }> &
  TDestroyable;
