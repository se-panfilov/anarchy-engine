import type { TMeters } from '@hellpig/anarchy-engine/Math/Types';

export type TBoxGeometryParams = Readonly<{
  width?: TMeters;
  height?: TMeters;
  depth?: TMeters;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
}>;
