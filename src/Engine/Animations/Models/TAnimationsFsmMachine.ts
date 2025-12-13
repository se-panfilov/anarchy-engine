import type { StateMachine } from 'typescript-fsm';

import type { TEventsFsm, TStatesFsm } from './TAnimationsFsmParams';

export type TAnimationsFsmMachine = StateMachine<TStatesFsm, TEventsFsm>;
