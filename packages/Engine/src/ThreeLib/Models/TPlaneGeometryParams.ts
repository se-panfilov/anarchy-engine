import type { TMeters } from '@/Engine/Math';

export type TPlaneGeometryParams = Readonly<{
  width?: TMeters;
  height?: TMeters;
  widthSegments?: number;
  heightSegments?: number;
}>;
