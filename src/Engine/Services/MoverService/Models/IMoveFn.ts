import type anime from 'animejs';

import type { IFollowTargetParams } from './IFollowTargetParams';
import type { IMoveByPathFnParams } from './IMoveByPathFnParams';
import type { IMoveFnParams } from './IMoveFnParams';

export type IMoveableByTick = Readonly<{
  tick: (time: number) => void;
}>;
export type IMoveFn = (params: IMoveFnParams) => IMoveableByTick & anime.AnimeInstance;
export type IMoveByPathFn = (params: IMoveByPathFnParams) => IMoveableByTick & anime.AnimeInstance;
export type IFollowTargetFn = (params: IFollowTargetParams) => IMoveableByTick;
