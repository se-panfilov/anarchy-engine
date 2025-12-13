import anime from 'animejs';

import type { TWithCoordsXYZ } from '@/Engine/Mixins';
import { defaultAnimationParams, Easing } from '@/Engine/Services/MoverService/Constants';
import type { TFollowTargetFn, TFollowTargetParams, TMoveableByTick, TMoveByPathFn, TMoveByPathFnParams, TMoveFn, TMoveFnParams } from '@/Engine/Services/MoverService/Models';
import { getAnimationWrapperForComplexPathAnimation } from '@/Engine/Services/MoverService/MoverServiceUtils';
import { isDefined } from '@/Engine/Utils';

export const goStraightMove: TMoveFn = ({ obj, destination, animationParams, complete }: TMoveFnParams): anime.AnimeInstance => {
  return anime({
    targets: obj,
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
      targets: obj,
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
      const position: TWithCoordsXYZ = { ...target };
      // eslint-disable-next-line functional/immutable-data
      obj.x = position.x + (offset?.x ?? 0);
      // eslint-disable-next-line functional/immutable-data
      obj.y = position.y + (offset?.y ?? 0);
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(position.z)) obj.z = position.z + (offset?.z ?? 0);
    }
  };
};
