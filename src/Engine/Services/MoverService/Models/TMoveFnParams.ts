import type { TWithConnectedTransformAgent, TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TAnimationParams } from './TAnimationParams';
import type { TMoveDestination } from './TMoveDestination';

export type TMoveFnParams = Readonly<{
  obj: TWithTransformDrive<TWithConnectedTransformAgent>;
  destination: Required<TMoveDestination>;
  animationParams: TAnimationParams;
  complete: (...rest: ReadonlyArray<unknown>) => any;
}>;
