import type { TAnimationsFsmWrapper } from '@/Engine/Animations/Models';

export type TActorStates = Readonly<{
  animationsFsm?: TAnimationsFsmWrapper;
}>;
