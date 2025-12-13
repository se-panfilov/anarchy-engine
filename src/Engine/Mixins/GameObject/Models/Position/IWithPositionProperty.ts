import type { IVector2, IVector3, IVector4 } from '@/Engine/Wrappers';

export type IWithPosition2dProperty = Readonly<{
  position: {
    x: number;
    y: number;
    set: (x: number, y: number) => IVector2;
  };
}>;

export type IWithPosition3dProperty = Readonly<{
  position: {
    x: number;
    y: number;
    z: number;
    set: (x: number, y: number, z: number) => IVector3;
  };
}>;

export type IWithPosition4dProperty = Readonly<{
  position: {
    x: number;
    y: number;
    z: number;
    w: number;
    set: (x: number, y: number, z: number, w: number) => IVector4;
  };
}>;

export type IWithPositionProperty = IWithPosition2dProperty | IWithPosition3dProperty | IWithPosition4dProperty;
