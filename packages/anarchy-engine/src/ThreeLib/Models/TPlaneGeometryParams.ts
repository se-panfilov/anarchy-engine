import type { TMeters } from '@hellpig/anarchy-engine/Math';

export type TPlaneGeometryParams = Readonly<{
  width?: TMeters;
  height?: TMeters;
  widthSegments?: number;
  heightSegments?: number;
}>;
