import type { FsmEventsStrategy, TFsmStates } from '@hellpig/anarchy-engine/Fsm';

export type TAnimationsFsmSource = Readonly<{ name: string; currentState?: TFsmStates; strategy?: FsmEventsStrategy }>;
