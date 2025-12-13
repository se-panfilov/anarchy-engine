import type { IMousePosition, IMouseWatcherEvent } from '@/Engine/Mouse';
import { MouseButtonValue } from '@/Engine/Mouse';
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

export function getMouseWatcherEvent(e: MouseEvent | WheelEvent): IMouseWatcherEvent {
  // TODO (S.Panfilov) debug
  console.log(e);
  const mouseBtnValue: MouseButtonValue = getMouseButtonValue(e.button);

  return { eventType: 'click_with_release', value: mouseBtnValue, button: e.button, x: e.clientX, y: e.clientY };
}
