import type { TActorStates } from './TActorStates';

export type TActorStatesConfig = Omit<TActorStates, 'animationsFsm'> &
  Readonly<{
    animationsFsmSource?: string;
  }>;
