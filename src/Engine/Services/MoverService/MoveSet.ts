import anime from 'animejs';
import type { Vector3 } from 'three';

import { defaultAnimationParams, Easing } from '@/Engine/Services/MoverService/Constants';
import type { TFollowTargetFn, TFollowTargetParams, TMoveableByTick, TMoveByPathFn, TMoveByPathFnParams, TMoveFn, TMoveFnParams } from '@/Engine/Services/MoverService/Models';
import { getAnimationWrapperForComplexPathAnimation } from '@/Engine/Services/MoverService/MoverServiceUtils';
import type { TWithDefaultTransformAgent, TWithTransformDrive } from '@/Engine/TransformDrive';
import { isDefined } from '@/Engine/Utils';

export const goStraightMove: TMoveFn = ({ obj, destination, animationParams, complete }: TMoveFnParams): anime.AnimeInstance => {
  return anime({
    targets: obj.drive.connected.positionConnector,
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
      targets: obj.drive.connected.positionConnector,
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
      const position: Vector3 = (target as unknown as TWithTransformDrive<TWithDefaultTransformAgent>).drive.getPosition();
      // eslint-disable-next-line functional/immutable-data
      obj.drive.connected.positionConnector.x = position.x + (offset?.x ?? 0);
      // eslint-disable-next-line functional/immutable-data
      obj.drive.connected.positionConnector.y = position.y + (offset?.y ?? 0);
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(position.z)) obj.drive.connected.positionConnector.z = position.z + (offset?.z ?? 0);
    }
  };
};
