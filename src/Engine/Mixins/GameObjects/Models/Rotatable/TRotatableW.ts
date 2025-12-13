export type TRotatableW = Readonly<{
  setRotationW: (w: number) => void;
  getRotationW: () => number;
  adjustRotationByW: (w: number) => void;
}>;
