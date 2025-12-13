import type { TFullKeyframeDestination } from './TFullKeyframeDestination';
import type { TMoveFnParams } from './TMoveFnParams';

export type TMoveByPathFnParams = Omit<TMoveFnParams, 'destination'> &
  Readonly<{
    path: ReadonlyArray<TFullKeyframeDestination>;
  }>;
