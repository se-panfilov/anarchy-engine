import type { TMouseWatcherEvent } from '@Anarchy/Engine/Mouse';
import { MouseButtonValue, MouseEventType, MouseWheelValue } from '@Anarchy/Engine/Mouse/Constants';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { Vector2Like } from 'three';

export const getNormalizedMousePosition = ({ x, y }: Vector2Like, rect: DOMRect): Vector2Like => ({ x: (x / rect.width) * 2 - 1, y: -((y / rect.height) * 2 - 1) });

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

export function getMouseWatcherEvent(event: MouseEvent | WheelEvent): TMouseWatcherEvent {
  const type: MouseEventType = getMouseEventType(event);
  const value: MouseButtonValue | MouseWheelValue = type === MouseEventType.Wheel ? getMouseWheelValue(event) : getMouseButtonValue(event);

  return { type, value, button: event.button, x: event.clientX, y: event.clientY, deltaY: (event as WheelEvent)?.deltaY };
}
