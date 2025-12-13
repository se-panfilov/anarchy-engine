import type { TFsmWrapper } from '@/Engine/Fsm';

import type { TActorStates } from './TActorStates';

export type TWithActorStates = Readonly<{
  states: TActorStates;
  setAnimationsFsm: (fsm: TFsmWrapper) => void;
}>;
