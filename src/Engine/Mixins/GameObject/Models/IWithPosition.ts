import type { IVector3Wrapper } from '@/Engine/Wrappers';

export type IWithPosition = Readonly<{
  setPosition: (x: number, y: number, z: number) => IVector3Wrapper;
  getPosition: () => IVector3Wrapper;
}>;
