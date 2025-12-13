import type { IVector3Wrapper } from '@/Engine/Wrappers';

export type ICameraAccessors = Readonly<{
  lookAt: (vector3: IVector3Wrapper) => void;
  setControls: (x: number, y: number, z: number) => IVector3Wrapper;
  setFov: (fov: number) => void;
  setNear: (near: number) => void;
  setFar: (far: number) => void;
  setAspect: (aspect: number) => void;
}>;
