import type { TVector3Params } from './TVector3Params';

export type TVector4Params = TVector3Params &
  Readonly<{
    w: number;
  }>;
