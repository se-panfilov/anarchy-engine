import anime from 'animejs';
import type { Subscription } from 'rxjs';

import type { TLoopService, TLoopTimes } from '@/Engine/Loop';
import type { TMovable3dXYZ } from '@/Engine/Mixins';
import type {
  TAnimationParams,
  TFullKeyframeDestination,
  TKeyframeDestination,
  TMovableEntityWrapper,
  TMovableWithModel3dFacade,
  TMoveableByTick,
  TMoveByPathFn,
  TMoveByPathFnParams,
  TMoveDestination,
  TMoveFn,
  TMoveFnParams,
  TStopMoveCb
} from '@/Engine/Services/MoverService/Models';
import type { TOptional } from '@/Engine/Utils';
import { createDeferredPromise, isDefined } from '@/Engine/Utils';

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
export function addMissingCoords<T extends TKeyframeDestination | TMoveDestination>(destination: T, obj: TMovable3dXYZ): TKeyframeDestination | Required<TMoveDestination> {
  return { ...destination, x: destination.x ?? obj.getX(), y: destination.y ?? obj.getY(), z: destination.z ?? obj.getZ() };
}

export function getAccumulatedKeyframes(path: ReadonlyArray<TKeyframeDestination>, obj: TMovable3dXYZ): ReadonlyArray<TFullKeyframeDestination> {
  return path.reduce((acc: ReadonlyArray<TFullKeyframeDestination>, destination: TKeyframeDestination, index: number) => {
    const prevDestination: TKeyframeDestination | undefined = acc[index - 1];
    const prevX: number = prevDestination?.x ?? obj.getX();
    const prevY: number = prevDestination?.y ?? obj.getY();
    const prevZ: number = prevDestination?.z ?? obj.getZ();
    const x: number = destination.x ?? prevX;
    const y: number = destination.y ?? prevY;
    const z: number = destination.z ?? prevZ;
    const newDestination: TFullKeyframeDestination = { ...destination, x, y, z };
    return [...acc, newDestination];
  }, []);
}

export function prepareDestination(destination: TMoveDestination, obj: TMovable3dXYZ): Required<TMoveDestination> {
  return addMissingCoords(destination, obj) as Required<TMoveDestination>;
}

export function preparePathList(list: ReadonlyArray<TKeyframeDestination>, obj: TMovable3dXYZ): ReadonlyArray<TFullKeyframeDestination> {
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

export function isMovableEntityWrapper(obj: TMovableWithModel3dFacade | TMovableEntityWrapper): obj is TMovableEntityWrapper {
  return isDefined((obj as TMovableEntityWrapper).getPosition);
}

export function isMovableModel3dFacade(obj: TMovableWithModel3dFacade | TMovableEntityWrapper): obj is TMovableWithModel3dFacade {
  return isDefined((obj as TOptional<TMovableWithModel3dFacade>)?.entity?.getModel3d()?.position);
}
