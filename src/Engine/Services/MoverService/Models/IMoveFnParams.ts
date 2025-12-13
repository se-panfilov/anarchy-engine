import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { IAnimationParams } from '@/Engine/Services';

import type { IMoveDestination } from './IMoveDestination';

export type IMoveFnParams = Readonly<{
  actor: IActorWrapper;
  destination: Required<IMoveDestination>;
  animationParams: IAnimationParams;
  complete: (...rest: ReadonlyArray<unknown>) => any;
}>;
