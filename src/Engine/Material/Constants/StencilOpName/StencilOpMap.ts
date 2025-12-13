import type { StencilOp } from 'three';
import { DecrementStencilOp, DecrementWrapStencilOp, IncrementStencilOp, IncrementWrapStencilOp, InvertStencilOp, KeepStencilOp, ReplaceStencilOp, ZeroStencilOp } from 'three';

import { StencilOpName } from './StencilOpName';

export const StencilOpMap: Readonly<Record<StencilOpName, StencilOp>> = {
  [StencilOpName.ZeroStencilOp]: ZeroStencilOp,
  [StencilOpName.KeepStencilOp]: KeepStencilOp,
  [StencilOpName.ReplaceStencilOp]: ReplaceStencilOp,
  [StencilOpName.IncrementStencilOp]: IncrementStencilOp,
  [StencilOpName.DecrementStencilOp]: DecrementStencilOp,
  [StencilOpName.IncrementWrapStencilOp]: IncrementWrapStencilOp,
  [StencilOpName.DecrementWrapStencilOp]: DecrementWrapStencilOp,
  [StencilOpName.InvertStencilOp]: InvertStencilOp
};
