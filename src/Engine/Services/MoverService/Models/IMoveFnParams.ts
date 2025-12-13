import type { IMovableEntityWrapper } from './IMovableWrapper';
import type { IMoveDestination } from './IMoveDestination';
import type { TAnimationParams } from './TAnimationParams';

export type IMoveFnParams = Readonly<{
  obj: IMovableEntityWrapper;
  destination: Required<IMoveDestination>;
  animationParams: TAnimationParams;
  complete: (...rest: ReadonlyArray<unknown>) => any;
}>;
