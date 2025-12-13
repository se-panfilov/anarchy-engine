import type { TFsmWrapper } from '@Anarchy/Engine/Fsm';

import type { TActorStates } from './TActorStates';

export type TWithActorStates = Readonly<{
  states: TActorStates;
  setAnimationsFsm: (fsm: TFsmWrapper) => void;
  findAnimationsFsm: () => TFsmWrapper | undefined;
  getAnimationsFsm: () => TFsmWrapper | never;
}>;
