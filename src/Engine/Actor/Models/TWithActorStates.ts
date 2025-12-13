import type { TAnimationsFsmWrapper } from '@/Engine/Animations';

import type { TActorStates } from './TActorStates';

export type TWithActorStates = Readonly<{
  states: TActorStates;
  setAnimationsFsm: (animationsFsm: TAnimationsFsmWrapper) => void;
}>;
