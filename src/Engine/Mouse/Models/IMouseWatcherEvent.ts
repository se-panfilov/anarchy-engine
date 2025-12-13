import type { MouseButtonValue, MouseEventType, MouseWheelValue } from '@/Engine/Mouse/Constants';

export type IMouseWatcherEvent = Readonly<{
  type: MouseEventType;
  value: MouseButtonValue | MouseWheelValue;
  button: number;
  x: number;
  y: number;
}>;
