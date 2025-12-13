import type { DepthPackingStrategies } from 'three/src/constants';
import { BasicDepthPacking, RGBADepthPacking } from 'three/src/constants';

import { DepthPackingStrategiesName } from './DepthPackingStrategiesName';

export const DepthPackingStrategiesMap: Readonly<Record<DepthPackingStrategiesName, DepthPackingStrategies>> = {
  [DepthPackingStrategiesName.BasicDepthPacking]: BasicDepthPacking,
  [DepthPackingStrategiesName.RGBADepthPacking]: RGBADepthPacking
};
