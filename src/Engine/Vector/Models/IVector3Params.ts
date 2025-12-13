import type { IVector2Params } from './IVector2Params';

export type IVector3Params = IVector2Params &
  Readonly<{
    z?: number;
  }>;
