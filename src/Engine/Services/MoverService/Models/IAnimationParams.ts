import type { EasingOptions } from 'animejs';

export type IAnimationParams = {
  duration: number;
  direction?: 'alternate' | 'reverse' | 'normal';
  round?: number; //i.g. animation steps (how often to update the value)
  delay?: number;
  endDelay?: number; //i.g. delay after animation
  loop?: boolean;
  easing?: EasingOptions;
};
