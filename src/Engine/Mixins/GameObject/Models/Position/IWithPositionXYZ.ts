import type { IVector3Wrapper } from '@/Engine/Wrappers';

export type IWithPositionXYZ = Readonly<{
  setPosition: (position: IVector3Wrapper) => IVector3Wrapper;
  getPosition: () => IVector3Wrapper;
}>;
