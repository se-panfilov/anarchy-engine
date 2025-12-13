import type { Vector2, Vector4 } from 'three';
import type { Vector3 } from 'three/src/math/Vector3';

export type TWithPosition2dProperty = Readonly<{
  position: Vector2;
}>;

export type TWithPosition3dProperty = Readonly<{
  position: Vector3;
}>;

export type TWithPosition4dProperty = Readonly<{
  position: Vector4;
}>;

export type TWithPositionProperty = TWithPosition2dProperty | TWithPosition3dProperty | TWithPosition4dProperty;
