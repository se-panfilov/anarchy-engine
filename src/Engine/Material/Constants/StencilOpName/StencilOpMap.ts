import type { StencilOp } from 'three/src/constants';

import { StencilOpName } from './StencilOpName';

export const StencilOpMap: Readonly<Record<StencilOpName, StencilOp>> = {
  [StencilOpName.WWW]: EEE
};
