import type { TMeters } from '@/Math';

export type TPlaneGeometryParams = Readonly<{
  width?: TMeters;
  height?: TMeters;
  widthSegments?: number;
  heightSegments?: number;
}>;
