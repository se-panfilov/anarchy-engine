import type { IMousePosition } from '@Engine/Models';

import type { IVector2, IVector3 } from '@/Engine/Wrappers';
import { Vector2Wrapper } from '@/Engine/Wrappers';

// TODO (S.Panfilov) I don't like this being a distinct function, also don't really get why I might need that normalization
export function getNormalizedMousePosition(position: IMousePosition | IVector3 | IVector2): IVector2 {
  const { x, y } = position;

  return Vector2Wrapper({
    x: (x / window.innerWidth) * 2 - 1,
    y: -(y / window.innerHeight) * 2 + 1
  }).entity;
}
