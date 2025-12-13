import type { TActorStates } from './TActorStates';

export type TWithActorStates = Readonly<{
  states: TActorStates;
  setAnimationsFsm: (animationsFsm: any) => void;
}>;
