import type { IAnimationParams } from './IAnimationParams';
import type { IMovableEntityWrapper } from './IMovableWrapper';
import type { IMoveDestination } from './IMoveDestination';

export type IMoveFnParams = Readonly<{
  obj: IMovableEntityWrapper;
  destination: Required<IMoveDestination>;
  animationParams: IAnimationParams;
  complete: (...rest: ReadonlyArray<unknown>) => any;
}>;
