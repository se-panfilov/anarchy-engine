import type { Vector3 } from 'three';

export type TScalable = Readonly<{
  setScale: (x: number, y: number, z: number) => Vector3;
  getScale: () => Vector3;
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
