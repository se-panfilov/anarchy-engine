import type { Vector3, Vector2 } from 'three';

export interface ILightAccessors {
  readonly setPosition: (x: number, y: number, z: number) => Vector3;
  readonly setCastShadow: (value: boolean) => boolean;
  readonly setControls: (x: number, y: number, z: number) => Vector3;
  readonly setShadowMapSize: (x: number, y: number) => Vector2;
  readonly setFar: (value: number) => number;
  readonly setNormalBias: (val: number) => number;
}
