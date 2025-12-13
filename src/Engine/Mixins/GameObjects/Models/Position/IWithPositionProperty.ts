import type { TVector2, TVector3, TVector4 } from '@/Engine/Vector';

export type IWithPosition2dProperty = Readonly<{
  position: {
    x: number;
    y: number;
    set: (x: number, y: number) => TVector2;
  };
}>;

export type IWithPosition3dProperty = Readonly<{
  position: {
    x: number;
    y: number;
    z: number;
    set: (x: number, y: number, z: number) => TVector3;
  };
}>;

export type IWithPosition4dProperty = Readonly<{
  position: {
    x: number;
    y: number;
    z: number;
    w: number;
    set: (x: number, y: number, z: number, w: number) => TVector4;
  };
}>;

export type IWithPositionProperty = IWithPosition2dProperty | IWithPosition3dProperty | IWithPosition4dProperty;
