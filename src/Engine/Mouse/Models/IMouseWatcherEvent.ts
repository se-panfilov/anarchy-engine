import type { MouseButtonValue } from '@/Engine/Mouse/Constants';

export type IMouseWatcherEvent = Readonly<{
  eventType: string;
  value: MouseButtonValue | string;
  button: number;
  x: number;
  y: number;
}>;
