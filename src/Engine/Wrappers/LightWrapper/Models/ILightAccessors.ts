import type { Vector3, Vector2 } from 'three';

export type ILightAccessors = Readonly<{
  setPosition: (x: number, y: number, z: number) => Vector3;
  setCastShadow: (value: boolean) => boolean;
  setControls: (x: number, y: number, z: number) => Vector3;
  setShadowMapSize: (x: number, y: number) => Vector2;
  setFar: (value: number) => number;
  setNormalBias: (val: number) => number;
}>;
