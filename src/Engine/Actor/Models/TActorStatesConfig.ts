import type { TActorStates } from './TActorStates';
import type { TAnimationsFsmSource } from './TAnimationsFsmSource';

export type TActorStatesConfig = Omit<TActorStates, 'animationsFsm'> &
  Readonly<{
    animationsFsmSource?: TAnimationsFsmSource;
  }>;
