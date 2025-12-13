import type { StencilOp } from 'three/src/constants';
import { DecrementStencilOp, DecrementWrapStencilOp, IncrementStencilOp, IncrementWrapStencilOp, InvertStencilOp, KeepStencilOp, ReplaceStencilOp, ZeroStencilOp } from 'three/src/constants';

import { StencilFailName } from './StencilFailName';

export const StencilFailMap: Readonly<Record<StencilFailName, StencilOp>> = {
  [StencilFailName.ZeroStencilOp]: ZeroStencilOp,
  [StencilFailName.KeepStencilOp]: KeepStencilOp,
  [StencilFailName.ReplaceStencilOp]: ReplaceStencilOp,
  [StencilFailName.IncrementStencilOp]: IncrementStencilOp,
  [StencilFailName.DecrementStencilOp]: DecrementStencilOp,
  [StencilFailName.IncrementWrapStencilOp]: IncrementWrapStencilOp,
  [StencilFailName.DecrementWrapStencilOp]: DecrementWrapStencilOp,
  [StencilFailName.InvertStencilOp]: InvertStencilOp
};
