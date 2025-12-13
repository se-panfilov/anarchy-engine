import type { StateMachine } from 'typescript-fsm';

export type TAnimationsFsmMachine = StateMachine<string | number | symbol, string | number | symbol>;
