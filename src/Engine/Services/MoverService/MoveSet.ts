import anime from 'animejs';

import { defaultAnimationParams, Easing } from '@/Engine/Services/MoverService/Constants';
import type { followTargetFn, IFollowTargetParams, IMoveableByTick, IMoveByPathFn, IMoveByPathFnParams, IMoveFn, IMoveFnParams } from '@/Engine/Services/MoverService/Models';
import { getAnimationWrapperForComplexPathAnimation } from '@/Engine/Services/MoverService/MoverServiceUtils';
import type { IVector3Wrapper } from '@/Engine/Wrappers';

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

// This function doesn't care about framerate (and delta time) because the position depends on the target
export const followTarget: followTargetFn = ({ obj, target, offset }: IFollowTargetParams): IMoveableByTick => {
  return {
    tick: (): void => {
      const position: IVector3Wrapper = target.getPosition();
      obj.setX(position.getX() + (offset?.x ?? 0));
      obj.setY(position.getY() + (offset?.y ?? 0));
      obj.setZ(position.getZ() + (offset?.z ?? 0));
    }
  };
};
