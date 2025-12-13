import type { DepthPackingStrategies } from 'three';
import { BasicDepthPacking, RGBADepthPacking } from 'three';

import { DepthPackingStrategiesName } from './DepthPackingStrategiesName';

export const DepthPackingStrategiesMap: Readonly<Record<DepthPackingStrategiesName, DepthPackingStrategies>> = {
  [DepthPackingStrategiesName.BasicDepthPacking]: BasicDepthPacking,
  [DepthPackingStrategiesName.RGBADepthPacking]: RGBADepthPacking
};
