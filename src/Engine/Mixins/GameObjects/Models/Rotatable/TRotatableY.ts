export type TRotatableY = Readonly<{
  setRotationY: (y: number) => void;
  getRotationY: () => number;
  adjustRotationByY: (y: number) => void;
}>;
