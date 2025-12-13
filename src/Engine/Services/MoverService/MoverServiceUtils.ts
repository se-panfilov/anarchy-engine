import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { IFullKeyframeDestination, IKeyframeDestination, IMoveByPathFn, IMoveByPathFnParams, IMoveDestination, IMoveFn, IMoveFnParams } from '@/Engine/Services/MoverService/Models';
import type { Subscription } from 'rxjs';
import type { ILoopService, ILoopTimes } from '@/Engine/Domains/Loop';
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

export function addMissingCoords<T extends IKeyframeDestination | IMoveDestination>(destination: T, actor: IActorWrapper): IKeyframeDestination | Required<IMoveDestination> {
  return { ...destination, x: destination.x ?? actor.getX(), y: destination.y ?? actor.getY(), z: destination.z ?? actor.getZ() };
}

export function prepareDestination(destination: IMoveDestination, actor: IActorWrapper): Required<IMoveDestination> {
  return addMissingCoords(destination, actor) as Required<IMoveDestination>;
}

export function preparePathList(list: ReadonlyArray<IKeyframeDestination>, actor: IActorWrapper): ReadonlyArray<IFullKeyframeDestination> {
  return list.map((destination: IKeyframeDestination) => addMissingCoords(destination, actor) as IFullKeyframeDestination);
}
