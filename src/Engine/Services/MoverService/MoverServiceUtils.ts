import anime from 'animejs';
import type { Subscription } from 'rxjs';

import type { TLoopService, TLoopTimes } from '@/Engine/Loop';
import type { TMovable3dXYZ } from '@/Engine/Mixins';
import type {
  IFullKeyframeDestination,
  IKeyframeDestination,
  IMoveableByTick,
  IMoveByPathFn,
  IMoveByPathFnParams,
  IMoveDestination,
  IMoveFn,
  IMoveFnParams,
  IStopMoveCb,
  TAnimationParams
} from '@/Engine/Services/MoverService/Models';
import { createDeferredPromise } from '@/Engine/Utils';

export function performMove(moveFn: IMoveFn | IMoveByPathFn, loopService: TLoopService, params: Omit<IMoveFnParams, 'complete'> | Omit<IMoveByPathFnParams, 'complete'>): Promise<void> {
  const { promise, resolve } = createDeferredPromise();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const move = moveFn({ ...params, complete: resolve } as any);
  const tickSubscription: Subscription = loopService.tick$.subscribe(({ frameTime }: TLoopTimes): void => move.tick(frameTime));
  return promise.then(() => tickSubscription.unsubscribe());
}

export function performMoveUntil<F extends (params: P) => IMoveableByTick, P>(moveFn: F, loopService: TLoopService, params: P): IStopMoveCb {
  let move: IMoveableByTick | undefined = moveFn(params);
  const tickSubscription: Subscription = loopService.tick$.subscribe(({ frameTime }: TLoopTimes): void => move?.tick(frameTime));

  return (): void => {
    tickSubscription.unsubscribe();
    move = undefined;
  };
}

// Do not use this function for complex paths (with more than 1 point), it might not work as expected when partial coords are provided.
export function addMissingCoords<T extends IKeyframeDestination | IMoveDestination>(destination: T, actor: TMovable3dXYZ): IKeyframeDestination | Required<IMoveDestination> {
  return { ...destination, x: destination.x ?? actor.getX(), y: destination.y ?? actor.getY(), z: destination.z ?? actor.getZ() };
}

export function getAccumulatedKeyframes(path: ReadonlyArray<IKeyframeDestination>, obj: TMovable3dXYZ): ReadonlyArray<IFullKeyframeDestination> {
  return path.reduce((acc: ReadonlyArray<IFullKeyframeDestination>, destination: IKeyframeDestination, index: number) => {
    const prevDestination: IKeyframeDestination | undefined = acc[index - 1];
    const prevX: number = prevDestination?.x ?? obj.getX();
    const prevY: number = prevDestination?.y ?? obj.getY();
    const prevZ: number = prevDestination?.z ?? obj.getZ();
    const x: number = destination.x ?? prevX;
    const y: number = destination.y ?? prevY;
    const z: number = destination.z ?? prevZ;
    const newDestination: IFullKeyframeDestination = { ...destination, x, y, z };
    return [...acc, newDestination];
  }, []);
}

export function prepareDestination(destination: IMoveDestination, obj: TMovable3dXYZ): Required<IMoveDestination> {
  return addMissingCoords(destination, obj) as Required<IMoveDestination>;
}

export function preparePathList(list: ReadonlyArray<IKeyframeDestination>, obj: TMovable3dXYZ): ReadonlyArray<IFullKeyframeDestination> {
  return list.map((destination: IKeyframeDestination) => addMissingCoords(destination, obj) as IFullKeyframeDestination);
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
