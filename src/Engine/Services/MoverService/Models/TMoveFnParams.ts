import type { TWithCoordsXYZ } from '@/Engine/Mixins';

import type { TAnimationParams } from './TAnimationParams';
import type { TMoveDestination } from './TMoveDestination';

export type TMoveFnParams = Readonly<{
  obj: TWithCoordsXYZ;
  destination: Required<TMoveDestination>;
  animationParams: TAnimationParams;
  complete: (...rest: ReadonlyArray<unknown>) => any;
}>;
