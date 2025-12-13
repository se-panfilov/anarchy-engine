import type { TVector3Wrapper } from '@/Engine/Vector';

export type ICameraAccessors = Readonly<{
  lookAt: (vector3: TVector3Wrapper) => void;
  setControls: (x: number, y: number, z: number) => TVector3Wrapper;
  setFov: (fov: number) => void;
  setNear: (near: number) => void;
  setFar: (far: number) => void;
  setAspect: (aspect: number) => void;
}>;
