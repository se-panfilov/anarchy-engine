import type { TAnimationsFsmActor } from '@/Engine/Animations';

import type { TActorStates } from './TActorStates';

export type TWithActorStates = Readonly<{
  states: TActorStates;
  setAnimationsFsm: (animationsFsmActor: TAnimationsFsmActor) => void;
}>;
