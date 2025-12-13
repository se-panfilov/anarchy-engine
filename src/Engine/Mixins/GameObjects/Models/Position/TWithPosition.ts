import type { TVector2Wrapper, TVector3Wrapper, TVector4Wrapper } from '@/Engine/Vector';

export type TWithPosition2d = Readonly<{
  setPosition: (position: TVector2Wrapper) => TVector2Wrapper;
  getPosition: () => TVector2Wrapper;
}>;

export type TWithPosition3d = Readonly<{
  setPosition: (position: TVector3Wrapper) => TVector3Wrapper;
  getPosition: () => TVector3Wrapper;
}>;

export type TWithPosition4d = Readonly<{
  setPosition: (position: TVector4Wrapper) => TVector4Wrapper;
  getPosition: () => TVector4Wrapper;
}>;

export type TWithPosition = TWithPosition2d | TWithPosition3d | TWithPosition4d;
