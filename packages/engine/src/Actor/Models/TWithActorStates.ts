import type { TFsmWrapper } from '@/Fsm';

import type { TActorStates } from './TActorStates';

export type TWithActorStates = Readonly<{
  states: TActorStates;
  setAnimationsFsm: (fsm: TFsmWrapper) => void;
  findAnimationsFsm: () => TFsmWrapper | undefined;
  getAnimationsFsm: () => TFsmWrapper | never;
}>;
