import type { FsmEventsStrategy, TFsmStates } from '@Engine/Fsm';

export type TAnimationsFsmSource = Readonly<{ name: string; currentState?: TFsmStates; strategy?: FsmEventsStrategy }>;
