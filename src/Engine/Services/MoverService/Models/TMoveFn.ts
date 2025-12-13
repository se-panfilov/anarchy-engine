import type anime from 'animejs';

import type { TFollowTargetParams } from './TFollowTargetParams';
import type { TMoveByPathFnParams } from './TMoveByPathFnParams';
import type { TMoveFnParams } from './TMoveFnParams';

export type TMoveableByTick = Readonly<{
  tick: (time: number) => void;
}>;
export type TMoveFn = (params: TMoveFnParams) => TMoveableByTick & anime.AnimeInstance;
export type TMoveByPathFn = (params: TMoveByPathFnParams) => TMoveableByTick & anime.AnimeInstance;
export type TFollowTargetFn = (params: TFollowTargetParams) => TMoveableByTick;
