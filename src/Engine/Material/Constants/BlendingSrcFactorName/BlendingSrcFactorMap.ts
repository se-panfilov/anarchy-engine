import type { BlendingDstFactor, BlendingSrcFactor } from 'three/src/constants';

import { BlendingSrcFactorName } from './BlendingSrcFactorName';

export const BlendingSrcFactorMap: Readonly<Record<BlendingSrcFactorName, BlendingDstFactor | BlendingSrcFactor>> = {
  [BlendingSrcFactorName.WWW]: EEE
};
