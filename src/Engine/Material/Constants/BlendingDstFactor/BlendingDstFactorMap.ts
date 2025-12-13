import type { BlendingDstFactor } from 'three/src/constants';

import { BlendingDstFactorName } from './BlendingDstFactorName';

export const BlendingDstFactorMap: Readonly<Record<BlendingDstFactorName, BlendingDstFactor>> = {
  [BlendingDstFactorName.WWW]: EEE
};
