import type { Subscription } from 'rxjs';

import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { ILoopService, ILoopTimes } from '@/Engine/Domains/Loop';
import type { IFullKeyframeDestination, IKeyframeDestination, IMoveByPathFn, IMoveByPathFnParams, IMoveDestination, IMoveFn, IMoveFnParams } from '@/Engine/Services/MoverService/Models';
import { createDeferredPromise } from '@/Engine/Utils';

export function performMove(moveFn: IMoveFn | IMoveByPathFn, loopService: ILoopService, params: Omit<IMoveFnParams, 'complete'> | Omit<IMoveByPathFnParams, 'complete'>): Promise<void> {
  const { promise, resolve } = createDeferredPromise();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const move = moveFn({ ...params, complete: resolve } as any);
  const tickSubscription: Subscription = loopService.tick$.subscribe(({ frameTime }: ILoopTimes): void => {
    // TODO (S.Panfilov) CWP what about delta time?
    // TODO (S.Panfilov) I'm not sure if this makes animation independent from frame rate. Need to test.
    move.tick(frameTime);
  });
  return promise.then(() => tickSubscription.unsubscribe());
}

// Do not use this function for complex paths (with more than 1 point), it might not work as expected when partial coords are provided.
export function addMissingCoords<T extends IKeyframeDestination | IMoveDestination>(destination: T, actor: IActorWrapper): IKeyframeDestination | Required<IMoveDestination> {
  return { ...destination, x: destination.x ?? actor.getX(), y: destination.y ?? actor.getY(), z: destination.z ?? actor.getZ() };
}

export function getAccumulatedKeyframes(path: ReadonlyArray<IKeyframeDestination>, actor: IActorWrapper): ReadonlyArray<IFullKeyframeDestination> {
  return path.reduce((acc: ReadonlyArray<IFullKeyframeDestination>, destination: IKeyframeDestination, index: number) => {
    const prevDestination: IKeyframeDestination | undefined = acc[index - 1];
    const prevX: number = prevDestination?.x ?? actor.getX();
    const prevY: number = prevDestination?.y ?? actor.getY();
    const prevZ: number = prevDestination?.z ?? actor.getZ();
    const x: number = destination.x ?? prevX;
    const y: number = destination.y ?? prevY;
    const z: number = destination.z ?? prevZ;
    const newDestination: IFullKeyframeDestination = { ...destination, x, y, z };
    return [...acc, newDestination];
  }, []);
}

export function prepareDestination(destination: IMoveDestination, actor: IActorWrapper): Required<IMoveDestination> {
  return addMissingCoords(destination, actor) as Required<IMoveDestination>;
}

export function preparePathList(list: ReadonlyArray<IKeyframeDestination>, actor: IActorWrapper): ReadonlyArray<IFullKeyframeDestination> {
  return list.map((destination: IKeyframeDestination) => addMissingCoords(destination, actor) as IFullKeyframeDestination);
}
