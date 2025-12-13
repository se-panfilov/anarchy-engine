import type { StencilOp } from 'three';
import { DecrementStencilOp, DecrementWrapStencilOp, IncrementStencilOp, IncrementWrapStencilOp, InvertStencilOp, KeepStencilOp, ReplaceStencilOp, ZeroStencilOp } from 'three';

import { StencilOpName } from './StencilOpName';

export const StencilOpMap: Readonly<Record<StencilOpName, StencilOp>> = {
  [StencilOpName.DecrementStencilOp]: DecrementStencilOp,
  [StencilOpName.DecrementWrapStencilOp]: DecrementWrapStencilOp,
  [StencilOpName.IncrementStencilOp]: IncrementStencilOp,
  [StencilOpName.IncrementWrapStencilOp]: IncrementWrapStencilOp,
  [StencilOpName.InvertStencilOp]: InvertStencilOp,
  [StencilOpName.KeepStencilOp]: KeepStencilOp,
  [StencilOpName.ReplaceStencilOp]: ReplaceStencilOp,
  [StencilOpName.ZeroStencilOp]: ZeroStencilOp
};
