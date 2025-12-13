import anime from 'animejs';

import { defaultAnimationParams, Easing } from '@/Engine/Services/MoverService/Constants';
import type { IMoveByPathFn, IMoveByPathFnParams, IMoveFn, IMoveFnParams } from '@/Engine/Services/MoverService/Models';
import { getAnimationWrapperForComplexPathAnimation } from '@/Engine/Services/MoverService/MoverServiceUtils';

export const goStraightMove: IMoveFn = ({ actor, destination, animationParams, complete }: IMoveFnParams): anime.AnimeInstance => {
  return anime({
    targets: actor.entity.position,
    x: destination.x,
    y: destination.y,
    z: destination.z,
    ...defaultAnimationParams,
    ...animationParams,
    autoplay: false,
    complete
  });
};

export const byPathMove: IMoveByPathFn = ({ actor, path, animationParams, complete }: IMoveByPathFnParams): anime.AnimeInstance => {
  return getAnimationWrapperForComplexPathAnimation(
    anime({
      targets: actor.entity.position,
      keyframes: path,
      ...defaultAnimationParams,
      ...animationParams,
      complete,
      easing: Easing.Linear,
      autoplay: false
    }),
    animationParams
  );
};
