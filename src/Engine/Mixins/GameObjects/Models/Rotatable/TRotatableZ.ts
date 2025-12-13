export type TRotatableZ = Readonly<{
  setRotationZ: (z: number) => void;
  getRotationZ: () => number;
  adjustRotationByZ: (z: number) => void;
}>;
