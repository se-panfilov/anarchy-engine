import type { IVector2Params } from '@Engine/Wrappers';

export type IVector3Params = IVector2Params &
  Readonly<{
    z?: number;
  }>;
