import type { TMovable3dXYZ } from '@/Engine/Mixins';

import type { TAnimationParams } from './TAnimationParams';
import type { TMoveDestination } from './TMoveDestination';

export type TMoveFnParams = Readonly<{
  obj: TMovable3dXYZ;
  destination: Required<TMoveDestination>;
  animationParams: TAnimationParams;
  complete: (...rest: ReadonlyArray<unknown>) => any;
}>;
