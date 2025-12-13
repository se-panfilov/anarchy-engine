import type { IMoveDestination } from './IMoveDestination';

export type IKeyframeDestination = IMoveDestination &
  Readonly<{
    duration?: number;
    easing?: string;
    delay?: number;
    value?: number;
  }>;
