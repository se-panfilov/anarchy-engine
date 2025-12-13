import type { TAnimationParams } from './TAnimationParams';
import type { TMovableEntityWrapper } from './TMovableWrapper';
import type { TMoveDestination } from './TMoveDestination';

export type TMoveFnParams = Readonly<{
  obj: TMovableEntityWrapper;
  destination: Required<TMoveDestination>;
  animationParams: TAnimationParams;
  complete: (...rest: ReadonlyArray<unknown>) => any;
}>;
