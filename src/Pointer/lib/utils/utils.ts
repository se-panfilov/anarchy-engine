import { Vector2, Vector3 } from 'three';
import { MousePosition } from '../models/MousePosition';

// TODO (S.Panfilov) I don't like this being a distinct function, also don't really get why I might need that normalization
export function getNormalizedMousePosition(position: MousePosition | Vector3 | Vector2): MousePosition {
  const { x, y } = position;

  return {
    x: (x / window.innerWidth) * 2 - 1,
    y: -(y / window.innerHeight) * 2 + 1
  };
}
