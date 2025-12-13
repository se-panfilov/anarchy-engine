import { isNotDefined } from '@/Engine';
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

export function getMouseButtonValue({ button }: MouseEvent | WheelEvent): MouseButtonValue {
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

export function getMouseEventType(event: MouseEvent | WheelEvent): MouseEventType | never {
  switch (event.type) {
    case 'mouseup':
      return MouseEventType.MouseUp;
    case 'mousedown':
      return MouseEventType.MouseDown;
    case 'dblclick':
      return MouseEventType.DoubleClick;
    case 'wheel':
      return MouseEventType.Wheel;
    default:
      throw new Error(`Unknown mouse event type: ${event.type}`);
  }
}

export function getMouseWheelValue(event: MouseEvent | WheelEvent): MouseWheelValue | never {
  if (isNotDefined((event as WheelEvent).deltaY)) throw new Error('Mouse wheel event does not have deltaY property');
  return (event as WheelEvent).deltaY < 0 ? MouseWheelValue.WheelUp : MouseWheelValue.WheelDown;
}

export function getMouseWatcherEvent(event: MouseEvent | WheelEvent): IMouseWatcherEvent {
  const type: MouseEventType = getMouseEventType(event);
  const value: MouseButtonValue | MouseWheelValue = type === MouseEventType.Wheel ? getMouseWheelValue(event) : getMouseButtonValue(event);

  return { type, value, button: event.button, x: event.clientX, y: event.clientY, deltaY: (event as WheelEvent)?.deltaY };
}
