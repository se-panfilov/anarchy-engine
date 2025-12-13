import type { TVector2Params } from './TVector2Params';

export type TVector3Params = TVector2Params &
  Readonly<{
    z?: number;
  }>;
