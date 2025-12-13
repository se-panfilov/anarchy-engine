import type { FsmEventsStrategy, TFsmStates } from '@Anarchy/Engine/Fsm';

export type TAnimationsFsmSource = Readonly<{ name: string; currentState?: TFsmStates; strategy?: FsmEventsStrategy }>;
