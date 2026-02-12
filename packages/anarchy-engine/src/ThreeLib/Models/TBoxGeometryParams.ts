import type { TMeters } from '@Anarchy/Engine/Math/Types';

export type TBoxGeometryParams = Readonly<{
  width?: TMeters;
  height?: TMeters;
  depth?: TMeters;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
}>;
