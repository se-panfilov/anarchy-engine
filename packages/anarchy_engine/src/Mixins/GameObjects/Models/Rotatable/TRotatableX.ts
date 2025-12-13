export type TRotatableX = Readonly<{
  setRotationX: (x: number) => void;
  getRotationX: () => number;
  adjustRotationByX: (x: number) => void;
}>;
