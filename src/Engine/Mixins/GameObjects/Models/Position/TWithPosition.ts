import type { TVector2, TVector2Wrapper, TVector3, TVector3Wrapper, TVector4, TVector4Wrapper } from '@/Engine/Vector';

export type TWithPosition2d = Readonly<{
  setPosition: (position: TVector2Wrapper) => TVector2;
  addPosition: (position: TVector2Wrapper) => TVector2;
  getPosition: () => TVector2Wrapper;
}>;

export type TWithPosition3d = Readonly<{
  setPosition: (position: TVector3Wrapper) => TVector3;
  addPosition: (position: TVector3Wrapper) => TVector3;
  getPosition: () => TVector3Wrapper;
}>;

export type TWithPosition4d = Readonly<{
  setPosition: (position: TVector4Wrapper) => TVector4;
  addPosition: (position: TVector4Wrapper) => TVector4;
  getPosition: () => TVector4Wrapper;
}>;

export type TWithPosition = TWithPosition2d | TWithPosition3d | TWithPosition4d;
