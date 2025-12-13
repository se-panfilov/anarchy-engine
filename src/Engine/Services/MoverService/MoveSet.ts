import anime from 'animejs';

import { defaultAnimationParams, Easing } from '@/Engine/Services/MoverService/Constants';
import type { IMoveByPathFn, IMoveByPathFnParams, IMoveFn, IMoveFnParams } from '@/Engine/Services/MoverService/Models';

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
  const baseAnimation = anime({
    targets: actor.entity.position,
    keyframes: path,
    ...defaultAnimationParams,
    ...animationParams,
    easing: Easing.Linear,
    autoplay: false
  });

  return anime({
    targets: baseAnimation,
    progress: [0, 100],
    easing: animationParams.easing,
    duration: animationParams.duration,
    complete,
    update: () => baseAnimation.seek(baseAnimation.duration * (baseAnimation.progress / 100))
  });
};
