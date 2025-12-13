import type { MouseButtonValue, MouseEventType, MouseWheelValue } from '@/Mouse/Constants';

export type TMouseWatcherEvent = Readonly<{
  type: MouseEventType;
  value: MouseButtonValue | MouseWheelValue;
  button: number;
  x: number;
  y: number;
  deltaY: number | undefined;
}>;
