import type { FsmEventsStrategy, TFsmStates } from '@/Fsm';

export type TAnimationsFsmSource = Readonly<{ name: string; currentState?: TFsmStates; strategy?: FsmEventsStrategy }>;
