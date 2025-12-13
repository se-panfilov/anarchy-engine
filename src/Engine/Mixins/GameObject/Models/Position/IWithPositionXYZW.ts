import type { IVector4Wrapper } from '@/Engine/Wrappers';

export type IWithPositionXYZW = Readonly<{
  setPosition: (position: IVector4Wrapper) => IVector4Wrapper;
  getPosition: () => IVector4Wrapper;
}>;
