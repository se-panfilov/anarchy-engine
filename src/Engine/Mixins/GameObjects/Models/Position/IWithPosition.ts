import type { TVector2Wrapper, TVector3Wrapper, TVector4Wrapper } from '@/Engine/Vector';

export type IWithPosition2d = Readonly<{
  setPosition: (position: TVector2Wrapper) => TVector2Wrapper;
  getPosition: () => TVector2Wrapper;
}>;

export type IWithPosition3d = Readonly<{
  setPosition: (position: TVector3Wrapper) => TVector3Wrapper;
  getPosition: () => TVector3Wrapper;
}>;

export type IWithPosition4d = Readonly<{
  setPosition: (position: TVector4Wrapper) => TVector4Wrapper;
  getPosition: () => TVector4Wrapper;
}>;

export type IWithPosition = IWithPosition2d | IWithPosition3d | IWithPosition4d;
