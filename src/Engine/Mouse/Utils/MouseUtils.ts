import type { IMousePosition, IMouseWatcherEvent } from '@/Engine/Mouse';
import { MouseButtonValue, MouseEventType, MouseWheelValue } from '@/Engine/Mouse';
import type { IVector2, IVector3 } from '@/Engine/Vector';
import { Vector2Wrapper } from '@/Engine/Vector';

// TODO (S.Panfilov) I don't like this being a distinct function, also don't really get why I might need that normalization
export function getNormalizedMousePosition(position: IMousePosition | IVector3 | IVector2): IVector2 {
  const { x, y } = position;

  return Vector2Wrapper({
    x: (x / window.innerWidth) * 2 - 1,
    y: -(y / window.innerHeight) * 2 + 1
  }).entity;
}

export function getMouseButtonValue(button: number): MouseButtonValue {
  switch (button) {
    case 0:
      return MouseButtonValue.Left;
    case 1:
      return MouseButtonValue.Middle;
    case 2:
      return MouseButtonValue.Right;
    case 3:
      return MouseButtonValue.Back;
    case 4:
      return MouseButtonValue.Forward;
    default:
      return MouseButtonValue.Extra;
  }
}

export function getMouseEventType(e: MouseEvent | WheelEvent): MouseEventType | never {
  switch (e.type) {
    case 'mouseup':
      return MouseEventType.MouseUp;
    case 'mousedown':
      return MouseEventType.MouseDown;
    case 'dblclick':
      return MouseEventType.DoubleClick;
    case 'wheel':
      return MouseEventType.Wheel;
    default:
      throw new Error(`Unknown mouse event type: ${e.type}`);
  }
}

export const getMouseWheelValue = (button: number): MouseWheelValue => (button === 0 ? MouseWheelValue.WheelUp : MouseWheelValue.WheelDown);

export function getMouseWatcherEvent(e: MouseEvent | WheelEvent): IMouseWatcherEvent {
  const type: MouseEventType = getMouseEventType(e);
  const value: MouseButtonValue | MouseWheelValue = type === MouseEventType.Wheel ? getMouseWheelValue(e.button) : getMouseButtonValue(e.button);

  return { type, value, button: e.button, x: e.clientX, y: e.clientY };
}
