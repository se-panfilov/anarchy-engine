import type { IVector2Wrapper, IVector3Wrapper, IVector4Wrapper } from '@/Engine/Domains/Vector';

export type IWithPosition2d = Readonly<{
  setPosition: (position: IVector2Wrapper) => IVector2Wrapper;
  getPosition: () => IVector2Wrapper;
}>;

export type IWithPosition3d = Readonly<{
  setPosition: (position: IVector3Wrapper) => IVector3Wrapper;
  getPosition: () => IVector3Wrapper;
}>;

export type IWithPosition4d = Readonly<{
  setPosition: (position: IVector4Wrapper) => IVector4Wrapper;
  getPosition: () => IVector4Wrapper;
}>;

export type IWithPosition = IWithPosition2d | IWithPosition3d | IWithPosition4d;
