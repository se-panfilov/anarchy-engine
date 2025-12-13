import type { Vector3 } from 'three/src/math/Vector3';

export type TWithScale = {
  scale: {
    x: number;
    y: number;
    z: number;
    set: (x: number, y: number, z: number) => Vector3;
  };
};
