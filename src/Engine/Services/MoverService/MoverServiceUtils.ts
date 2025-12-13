import anime from 'animejs';
import type { Subscription } from 'rxjs';
import type { Vector3 } from 'three';

import type { TLoopService, TLoopTimes } from '@/Engine/Loop';
import type {
  TAnimationParams,
  TFullKeyframeDestination,
  TKeyframeDestination,
  TMoveableByTick,
  TMoveByPathFn,
  TMoveByPathFnParams,
  TMoveDestination,
  TMoveFn,
  TMoveFnParams,
  TStopMoveCb
} from '@/Engine/Services/MoverService/Models';
import type { TWithConnectedTransformAgent, TWithTransformDrive } from '@/Engine/TransformDrive';
import { createDeferredPromise } from '@/Engine/Utils';

export function performMove(moveFn: TMoveFn | TMoveByPathFn, loopService: TLoopService, params: Omit<TMoveFnParams, 'complete'> | Omit<TMoveByPathFnParams, 'complete'>): Promise<void> {
  const { promise, resolve } = createDeferredPromise();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const move = moveFn({ ...params, complete: resolve } as any);
  const tickSubscription: Subscription = loopService.tick$.subscribe(({ frameTime }: TLoopTimes): void => move.tick(frameTime));
  return promise.then(() => tickSubscription.unsubscribe());
}

export function performMoveUntil<F extends (params: P) => TMoveableByTick, P>(moveFn: F, loopService: TLoopService, params: P): TStopMoveCb {
  let move: TMoveableByTick | undefined = moveFn(params);
  const tickSubscription: Subscription = loopService.tick$.subscribe(({ frameTime }: TLoopTimes): void => move?.tick(frameTime));

  return (): void => {
    tickSubscription.unsubscribe();
    move = undefined;
  };
}

// Do not use this function for complex paths (with more than 1 point), it might not work as expected when partial coords are provided.
export function addMissingCoords<T extends TKeyframeDestination | TMoveDestination>(
  destination: T,
  obj: TWithTransformDrive<TWithConnectedTransformAgent>
): TKeyframeDestination | Required<TMoveDestination> {
  const objPosition: Vector3 = obj.drive.getPosition();
  return { ...destination, x: destination.x ?? objPosition.x, y: destination.y ?? objPosition.y, z: destination.z ?? objPosition.z };
}

export function getAccumulatedKeyframes(path: ReadonlyArray<TKeyframeDestination>, obj: TWithTransformDrive<TWithConnectedTransformAgent>): ReadonlyArray<TFullKeyframeDestination> {
  return path.reduce((acc: ReadonlyArray<TFullKeyframeDestination>, destination: TKeyframeDestination, index: number) => {
    const prevDestination: TKeyframeDestination | undefined = acc[index - 1];
    const objPosition: Vector3 = obj.drive.getPosition();
    const prevX: number = prevDestination?.x ?? objPosition.x;
    const prevY: number = prevDestination?.y ?? objPosition.y;
    const prevZ: number = prevDestination?.z ?? objPosition.z;
    const x: number = destination.x ?? prevX;
    const y: number = destination.y ?? prevY;
    const z: number = destination.z ?? prevZ;
    const newDestination: TFullKeyframeDestination = { ...destination, x, y, z };
    return [...acc, newDestination];
  }, []);
}

export function prepareDestination(destination: TMoveDestination, obj: TWithTransformDrive<TWithConnectedTransformAgent>): Required<TMoveDestination> {
  return addMissingCoords(destination, obj) as Required<TMoveDestination>;
}

export function preparePathList(list: ReadonlyArray<TKeyframeDestination>, obj: TWithTransformDrive<TWithConnectedTransformAgent>): ReadonlyArray<TFullKeyframeDestination> {
  return list.map((destination: TKeyframeDestination) => addMissingCoords(destination, obj) as TFullKeyframeDestination);
}

export function getAnimationWrapperForComplexPathAnimation(baseAnimation: anime.AnimeInstance, animationParams: TAnimationParams): anime.AnimeInstance {
  return anime({
    targets: baseAnimation,
    progress: [0, 100],
    easing: animationParams.easing,
    duration: animationParams.duration,
    update: () => baseAnimation.seek(baseAnimation.duration * (baseAnimation.progress / 100))
  });
}
