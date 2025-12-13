import type { AnimationActionLoopStyles } from 'three/src/constants';

export type TAnimationStateParams = Readonly<{
  name: string;
  time?: number;
  weight?: number;
  loop?: AnimationActionLoopStyles;
  repetitions?: number;
  clampWhenFinished?: boolean;
  timeScale?: number;
  enabled?: boolean;
  paused?: boolean;
}>;
