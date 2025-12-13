import type { IMovable } from './IMovable';
import type { IRotatable } from './IRotatable';
import type { IScalable } from './IScalable';

export type IWithObject3d = Readonly<{
  // TODO (S.Panfilov) CWP imlpement (and add the mixin itself)
}> &
  IRotatable &
  IMovable &
  IScalable;
