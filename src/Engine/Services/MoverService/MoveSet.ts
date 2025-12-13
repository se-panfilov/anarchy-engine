import anime from 'animejs';

import { defaultAnimationParams, Easing } from '@/Engine/Services/MoverService/Constants';
import type { followTargetFn, IFollowTargetParams, IMoveableByTick, IMoveByPathFn, IMoveByPathFnParams, IMoveFn, IMoveFnParams } from '@/Engine/Services/MoverService/Models';
import { getAnimationWrapperForComplexPathAnimation } from '@/Engine/Services/MoverService/MoverServiceUtils';
import { isVector3Wrapper } from '@/Engine/Utils';
import type { IVector2Wrapper, IVector3Wrapper } from '@/Engine/Vector';

export const goStraightMove: IMoveFn = ({ obj, destination, animationParams, complete }: IMoveFnParams): anime.AnimeInstance => {
  return anime({
    targets: obj.entity.position,
    x: destination.x,
    y: destination.y,
    z: destination.z,
    ...defaultAnimationParams,
    ...animationParams,
    autoplay: false,
    complete
  });
};

export const byPathMove: IMoveByPathFn = ({ obj, path, animationParams, complete }: IMoveByPathFnParams): anime.AnimeInstance => {
  return getAnimationWrapperForComplexPathAnimation(
    anime({
      targets: obj.entity.position,
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
      const position: IVector3Wrapper | IVector2Wrapper = target.getPosition();
      obj.setX(position.getX() + (offset?.x ?? 0));
      obj.setY(position.getY() + (offset?.y ?? 0));
      if (isVector3Wrapper(position)) obj.setZ(position.getZ() + (offset?.z ?? 0));
    }
  };
};
