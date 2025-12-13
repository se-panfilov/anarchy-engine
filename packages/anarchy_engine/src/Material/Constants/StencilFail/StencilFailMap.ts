import type { StencilOp } from 'three';
import { DecrementStencilOp, DecrementWrapStencilOp, IncrementStencilOp, IncrementWrapStencilOp, InvertStencilOp, KeepStencilOp, ReplaceStencilOp, ZeroStencilOp } from 'three';

import { StencilFailName } from './StencilFailName';

export const StencilFailMap: Readonly<Record<StencilFailName, StencilOp>> = {
  [StencilFailName.DecrementStencilOp]: DecrementStencilOp,
  [StencilFailName.DecrementWrapStencilOp]: DecrementWrapStencilOp,
  [StencilFailName.IncrementStencilOp]: IncrementStencilOp,
  [StencilFailName.IncrementWrapStencilOp]: IncrementWrapStencilOp,
  [StencilFailName.InvertStencilOp]: InvertStencilOp,
  [StencilFailName.KeepStencilOp]: KeepStencilOp,
  [StencilFailName.ReplaceStencilOp]: ReplaceStencilOp,
  [StencilFailName.ZeroStencilOp]: ZeroStencilOp
};
