import type { TMeters } from '@/Engine/Math/Types';

export type TBoxGeometryProps = Readonly<{
  width?: TMeters;
  height?: TMeters;
  depth?: TMeters;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
}>;
