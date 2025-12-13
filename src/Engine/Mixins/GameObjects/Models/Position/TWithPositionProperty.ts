import type { Vector2, Vector4 } from 'three';
import type { Vector3 } from 'three/src/math/Vector3';

export type TWithPosition2dProperty = Readonly<{
  position: {
    x: number;
    y: number;
    set: (x: number, y: number) => Vector2;
    // add: (x: number, y: number) => TVector2;
  };
}>;

export type TWithPosition3dProperty = Readonly<{
  position: {
    x: number;
    y: number;
    z: number;
    set: (x: number, y: number, z: number) => Vector3;
    // add: (x: number, y: number, z: number) => TVector3;
  };
}>;

export type TWithPosition4dProperty = Readonly<{
  position: {
    x: number;
    y: number;
    z: number;
    w: number;
    set: (x: number, y: number, z: number, w: number) => Vector4;
    // add: (x: number, y: number, z: number, w: number) => TVector4;
  };
}>;

export type TWithPositionProperty = TWithPosition2dProperty | TWithPosition3dProperty | TWithPosition4dProperty;
