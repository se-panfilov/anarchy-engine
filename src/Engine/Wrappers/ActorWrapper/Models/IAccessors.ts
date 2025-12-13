import type { Vector3 } from 'three';

export interface IAccessors {
  readonly setPosition: (x: number, y: number, z: number) => Vector3;
  readonly setCastShadow: (value: boolean) => boolean;
}
