import anime from 'animejs';

import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { IWithCoords3 } from '@/Engine/Mixins';
import { defaultAnimationParams } from '@/Engine/Services/MoverService/Constants';
import type { IAnimationParams, IMoveFn } from '@/Engine/Services/MoverService/Models';

export const goStraightMove: IMoveFn = (actor: IActorWrapper, targetPosition: IWithCoords3, params: IAnimationParams, complete: (...rest: ReadonlyArray<unknown>) => any): anime.AnimeInstance => {
  return anime({
    targets: actor.entity.position,
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    ...defaultAnimationParams,
    ...params,
    autoplay: false,
    complete
  });
};
