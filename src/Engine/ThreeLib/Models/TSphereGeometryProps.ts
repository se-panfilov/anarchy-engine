import type { TMeters } from '@/Engine/Math';

export type TSphereGeometryProps = Readonly<{
  radius?: TMeters;
  widthSegments?: number;
  heightSegments?: number;
  phiStart?: number;
  phiLength?: number;
  thetaStart?: number;
  thetaLength?: number;
}>;
