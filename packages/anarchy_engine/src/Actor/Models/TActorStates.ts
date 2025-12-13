import type { TFsmWrapper } from '@Engine/Fsm/Models';

export type TActorStates = Readonly<{
  animationsFsm?: TFsmWrapper;
}>;
