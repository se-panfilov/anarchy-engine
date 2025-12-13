import type { TMeters } from '@Anarchy/Engine/Math';

export type TSphereGeometryParams = Readonly<{
  radius?: TMeters;
  widthSegments?: number;
  heightSegments?: number;
  phiStart?: number;
  phiLength?: number;
  thetaStart?: number;
  thetaLength?: number;
}>;
