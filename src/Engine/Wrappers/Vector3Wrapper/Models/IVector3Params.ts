import type { IVector2Params } from '@/Engine';

export type IVector3Params = IVector2Params &
  Readonly<{
    z?: number;
  }>;
