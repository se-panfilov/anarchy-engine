import type { IVector3Params } from '@/Engine/Wrappers';

export type IVector4Params = IVector3Params &
  Readonly<{
    w: number;
  }>;
