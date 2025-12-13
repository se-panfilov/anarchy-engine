import type { StencilOp } from 'three/src/constants';

import { StencilFailName } from './StencilFailName';

export const StencilFailMap: Readonly<Record<StencilFailName, StencilOp>> = {
  [StencilFailName.WWW]: EEE
};
