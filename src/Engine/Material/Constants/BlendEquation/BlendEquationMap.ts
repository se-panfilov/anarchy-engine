import type { BlendingEquation } from 'three/src/constants';

import { BlendEquationName } from './BlendEquationName';

export const BlendEquationMap: Readonly<Record<BlendEquationName, BlendingEquation>> = {
  [BlendEquationName.WWW]: EEE
};
