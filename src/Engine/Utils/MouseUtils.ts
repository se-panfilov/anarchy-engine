import type { Vector2, Vector3 } from 'three';
import type { IMousePosition } from '@Engine/Models';

// TODO (S.Panfilov) I don't like this being a distinct function, also don't really get why I might need that normalization
export function getNormalizedMousePosition(position: IMousePosition | Vector3 | Vector2): IMousePosition {
  const { x, y } = position;

  return {
    // TODO (S.Panfilov) replace window with "container" from AmbientContext
    x: (x / window.innerWidth) * 2 - 1,
    y: -(y / window.innerHeight) * 2 + 1
  };
}
