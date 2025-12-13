export type TScaleMixin = Readonly<{
  setScaleX: (x: number) => void;
  getScaleX: () => number;
  setScaleY: (y: number) => void;
  getScaleY: () => number;
  setScaleZ: (z: number) => void;
  getScaleZ: () => number;
  adjustScaleByX: (x: number) => void;
  adjustScaleByY: (y: number) => void;
  adjustScaleByZ: (z: number) => void;
}>;
