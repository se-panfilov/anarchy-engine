import type { Vector2 } from 'three';

export type TMousePosition = Readonly<{
  coords: Vector2;
  normalizedCoords: Vector2;
}>;
