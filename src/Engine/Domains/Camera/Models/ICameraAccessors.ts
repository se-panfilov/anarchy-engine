import type { IEulerWrapper, IVector3Wrapper } from '@/Engine/Wrappers';

export type ICameraAccessors = Readonly<{
  setPosition: (x: number, y: number, z: number) => IVector3Wrapper;
  setRotation: (x: number, y: number, z: number) => IEulerWrapper;
  setCastShadow: (value: boolean) => boolean;
  setControls: (x: number, y: number, z: number) => IVector3Wrapper;
}>;
