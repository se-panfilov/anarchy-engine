import type { StencilFunc } from 'three';
import { AlwaysStencilFunc, EqualStencilFunc, GreaterEqualStencilFunc, GreaterStencilFunc, LessEqualStencilFunc, LessStencilFunc, NeverStencilFunc, NotEqualStencilFunc } from 'three';

import { StencilFuncName } from './StencilFuncName';

export const StencilFuncMap: Readonly<Record<StencilFuncName, StencilFunc>> = {
  [StencilFuncName.AlwaysStencilFunc]: AlwaysStencilFunc,
  [StencilFuncName.EqualStencilFunc]: EqualStencilFunc,
  [StencilFuncName.GreaterEqualStencilFunc]: GreaterEqualStencilFunc,
  [StencilFuncName.GreaterStencilFunc]: GreaterStencilFunc,
  [StencilFuncName.LessEqualStencilFunc]: LessEqualStencilFunc,
  [StencilFuncName.LessStencilFunc]: LessStencilFunc,
  [StencilFuncName.NeverStencilFunc]: NeverStencilFunc,
  [StencilFuncName.NotEqualStencilFunc]: NotEqualStencilFunc
};
