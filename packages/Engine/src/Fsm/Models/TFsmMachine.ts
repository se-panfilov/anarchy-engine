import type { StateMachine } from 'typescript-fsm';

import type { TFsmEvents } from './TFsmEvents';
import type { TFsmStates } from './TFsmStates';

export type TFsmMachine = StateMachine<TFsmStates, TFsmEvents>;
