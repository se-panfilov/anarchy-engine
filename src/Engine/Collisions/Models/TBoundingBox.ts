import type { Object3D } from 'three';

export type TBoundingBox = Readonly<{
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  object: Object3D;
}>;
