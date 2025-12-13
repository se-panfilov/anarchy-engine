import type { StencilFunc } from 'three/src/constants';
import { AlwaysStencilFunc, EqualStencilFunc, GreaterEqualStencilFunc, GreaterStencilFunc, LessEqualStencilFunc, LessStencilFunc, NeverStencilFunc, NotEqualStencilFunc } from 'three/src/constants';

import { StencilFuncName } from './StencilFuncName';

export const StencilFuncMap: Readonly<Record<StencilFuncName, StencilFunc>> = {
  [StencilFuncName.NeverStencilFunc]: NeverStencilFunc,
  [StencilFuncName.LessStencilFunc]: LessStencilFunc,
  [StencilFuncName.EqualStencilFunc]: EqualStencilFunc,
  [StencilFuncName.LessEqualStencilFunc]: LessEqualStencilFunc,
  [StencilFuncName.GreaterStencilFunc]: GreaterStencilFunc,
  [StencilFuncName.NotEqualStencilFunc]: NotEqualStencilFunc,
  [StencilFuncName.GreaterEqualStencilFunc]: GreaterEqualStencilFunc,
  [StencilFuncName.AlwaysStencilFunc]: AlwaysStencilFunc
};
