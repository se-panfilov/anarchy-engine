import anime from 'animejs';
import type { Vector2 } from 'three';
import type { Vector3 } from 'three/src/math/Vector3';

import { defaultAnimationParams, Easing } from '@/Engine/Services/MoverService/Constants';
import type { TFollowTargetFn, TFollowTargetParams, TMoveableByTick, TMoveByPathFn, TMoveByPathFnParams, TMoveFn, TMoveFnParams } from '@/Engine/Services/MoverService/Models';
import { getAnimationWrapperForComplexPathAnimation } from '@/Engine/Services/MoverService/MoverServiceUtils';
import { isVector3 } from '@/Engine/Utils';

export const goStraightMove: TMoveFn = ({ obj, destination, animationParams, complete }: TMoveFnParams): anime.AnimeInstance => {
  return anime({
    targets: obj.getPosition(),
    x: destination.x,
    y: destination.y,
    z: destination.z,
    ...defaultAnimationParams,
    ...animationParams,
    autoplay: false,
    complete
  });
};

export const byPathMove: TMoveByPathFn = ({ obj, path, animationParams, complete }: TMoveByPathFnParams): anime.AnimeInstance => {
  return getAnimationWrapperForComplexPathAnimation(
    anime({
      targets: obj.getPosition(),
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
export const followTarget: TFollowTargetFn = ({ obj, target, offset }: TFollowTargetParams): TMoveableByTick => {
  return {
    tick: (): void => {
      const position: Vector3 | Vector2 = target.getPosition();
      obj.setX(position.x + (offset?.x ?? 0));
      obj.setY(position.y + (offset?.y ?? 0));
      if (isVector3(position)) obj.setZ(position.z + (offset?.z ?? 0));
    }
  };
};
