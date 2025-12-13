export type TCoordinateAccessorX = Readonly<{
  addX: (x: number) => number;
  setX: (x: number) => number;
  getX: () => number;
}>;

export type TCoordinateAccessorY = Readonly<{
  addY: (y: number) => number;
  setY: (y: number) => number;
  getY: () => number;
}>;

export type TCoordinateAccessorZ = Readonly<{
  addZ: (z: number) => number;
  setZ: (z: number) => number;
  getZ: () => number;
}>;

export type TCoordinateAccessorW = Readonly<{
  addW: (z: number) => number;
  setW: (z: number) => number;
  getW: () => number;
}>;
