import type { TAnimationParams } from './TAnimationParams';
import type { TMovableEntityWrapper, TMovableWithModel3dFacade } from './TMovableWrapper';
import type { TMoveDestination } from './TMoveDestination';

export type TMoveFnParams = Readonly<{
  obj: TMovableEntityWrapper | TMovableWithModel3dFacade;
  destination: Required<TMoveDestination>;
  animationParams: TAnimationParams;
  complete: (...rest: ReadonlyArray<unknown>) => any;
}>;
