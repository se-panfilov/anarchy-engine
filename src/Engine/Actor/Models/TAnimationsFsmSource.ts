import type { TFsmStates } from '@/Engine/Fsm';

export type TAnimationsFsmSource = Readonly<{ name: string; currentState?: TFsmStates }>;
