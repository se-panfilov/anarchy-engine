import type { IVector3Wrapper } from '@/Engine/Wrappers';

export type IWithPosition = Readonly<{
  // TODO (S.Panfilov) perhaps in some cases it should be IVector2Wrapper instead of IVector3Wrapper
  setPosition: (x: number, y: number, z: number) => IVector3Wrapper;
  // TODO (S.Panfilov) perhaps in some cases it should be IVector2Wrapper instead of IVector3Wrapper
  getPosition: () => IVector3Wrapper;
}>;
