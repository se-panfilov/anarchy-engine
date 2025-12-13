import type { TMoveDestination } from './TMoveDestination';

export type TKeyframeDestination = TMoveDestination &
  Readonly<{
    duration?: number;
    easing?: string;
    delay?: number;
    value?: number;
  }>;
