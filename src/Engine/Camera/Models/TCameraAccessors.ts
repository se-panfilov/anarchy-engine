import type { Vector3 } from 'three/src/math/Vector3';

export type TCameraAccessors = Readonly<{
  lookAt: (vector3: Vector3) => void;
  setControls: (x: number, y: number, z: number) => Vector3;
  setFov: (fov: number) => void;
  setNear: (near: number) => void;
  setFar: (far: number) => void;
  setAspect: (aspect: number) => void;
}>;
