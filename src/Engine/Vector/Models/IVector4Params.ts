import type { IVector3Params } from './IVector3Params';

export type IVector4Params = IVector3Params &
  Readonly<{
    w: number;
  }>;
