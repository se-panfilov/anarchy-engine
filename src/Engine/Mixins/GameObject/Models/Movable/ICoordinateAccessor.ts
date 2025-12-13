export type ICoordinateAccessorX = Readonly<{
  addX: (x: number) => number;
  setX: (x: number) => number;
  getX: () => number;
}>;

export type ICoordinateAccessorY = Readonly<{
  addY: (y: number) => number;
  setY: (y: number) => number;
  getY: () => number;
}>;

export type ICoordinateAccessorZ = Readonly<{
  addZ: (z: number) => number;
  setZ: (z: number) => number;
  getZ: () => number;
}>;

export type ICoordinateAccessorW = Readonly<{
  addW: (z: number) => number;
  setW: (z: number) => number;
  getW: () => number;
}>;
