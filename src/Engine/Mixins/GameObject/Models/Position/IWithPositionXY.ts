import type { IVector2Wrapper } from '@/Engine/Wrappers';

export type IWithPositionXY = Readonly<{
  setPosition: (position: IVector2Wrapper) => IVector2Wrapper;
  getPosition: () => IVector2Wrapper;
}>;
