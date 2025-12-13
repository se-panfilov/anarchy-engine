import type { TMeters } from '@/Engine/Math';

export type TPlaneGeometryProps = Readonly<{
  width?: TMeters;
  height?: TMeters;
  widthSegments?: number;
  heightSegments?: number;
}>;
