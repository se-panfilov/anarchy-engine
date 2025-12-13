import type { DepthPackingStrategies } from 'three/src/constants';

import { DepthPackingStrategiesName } from './DepthPackingStrategiesName';

export const DepthPackingStrategiesMap: Readonly<Record<DepthPackingStrategiesName, DepthPackingStrategies>> = {
  [DepthPackingStrategiesName.WWW]: EEE
};
