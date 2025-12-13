import type { TMeters } from '@/Math';

export type TSphereGeometryParams = Readonly<{
  radius?: TMeters;
  widthSegments?: number;
  heightSegments?: number;
  phiStart?: number;
  phiLength?: number;
  thetaStart?: number;
  thetaLength?: number;
}>;
