import type { BlendingSrcFactor } from 'three';
import { SrcAlphaSaturateFactor } from 'three';

import { BlendingSrcFactorName } from './BlendingSrcFactorName';

export const BlendingSrcFactorMap: Readonly<Record<BlendingSrcFactorName, BlendingSrcFactor>> = {
  [BlendingSrcFactorName.SrcAlphaSaturateFactor]: SrcAlphaSaturateFactor
};
