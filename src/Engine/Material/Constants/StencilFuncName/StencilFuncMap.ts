import type { StencilFunc } from 'three/src/constants';

import { StencilFuncName } from './StencilFuncName';

export const StencilFuncMap: Readonly<Record<StencilFuncName, StencilFunc>> = {
  [StencilFuncName.WWW]: EEE
};
