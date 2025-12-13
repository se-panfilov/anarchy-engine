import type { AudioListener, Vector3 } from 'three';

export type TCommonCameraAccessors = Readonly<{
  addListener: (listener: AudioListener) => void;
  lookAt: (vector3: Vector3) => void;
  setControls: (x: number, y: number, z: number) => Vector3;
  setFar: (far: number) => void;
  setNear: (near: number) => void;
  setUp: (x: number, y: number, z: number) => void;
  setZoom: (zoom: number) => void;
}>;
