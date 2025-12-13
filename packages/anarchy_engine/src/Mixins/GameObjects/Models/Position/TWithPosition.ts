import type { Vector2, Vector3, Vector4 } from 'three';

export type TWithPosition2d = Readonly<{
  setPosition: (position: Vector2) => Vector2;
  addPosition: (position: Vector2) => Vector2;
  getPosition: () => Vector2;
}>;

export type TWithPosition3d = Readonly<{
  setPosition: (position: Vector3) => Vector3;
  addPosition: (position: Vector3) => Vector3;
  getPosition: () => Vector3;
}>;

export type TWithPosition4d = Readonly<{
  setPosition: (position: Vector4) => Vector4;
  addPosition: (position: Vector4) => Vector4;
  getPosition: () => Vector4;
}>;

export type TWithPosition = TWithPosition2d | TWithPosition3d | TWithPosition4d;
