import anime from 'animejs';
import type { Subscription } from 'rxjs';

import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { ILoopService, ILoopTimes } from '@/Engine/Domains/Loop';
import { defaultMoverServiceConfig } from '@/Engine/Services/MoverService/Constants';
import type { IAnimationParams, IKeyframeDestination, IMoveByPathFn, IMoveByPathFnParams, IMoveFn, IMoveFnParams, IMoverServiceConfig } from '@/Engine/Services/MoverService/Models';
import type { IMoveDestination } from '@/Engine/Services/MoverService/Models/IMoveDestination';
import type { IMoverService } from '@/Engine/Services/MoverService/Models/IMoverService';
import { prepareDestination, preparePathList } from '@/Engine/Services/MoverService/MoverServiceUtils';
import { byPathMove, goStraightMove } from '@/Engine/Services/MoverService/MoveSet';
import { createDeferredPromise } from '@/Engine/Utils';

export function MoverService(loopService: ILoopService, { suspendWhenDocumentHidden }: IMoverServiceConfig = defaultMoverServiceConfig): IMoverService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
  (anime as any).suspendWhenDocumentHidden = suspendWhenDocumentHidden;

  function performAction<T extends IMoveFn | IMoveByPathFn, P extends Omit<IMoveFnParams, 'complete'> | Omit<IMoveByPathFnParams, 'complete'>>(moveFn: T, params: P): Promise<void> {
    const { promise, resolve } = createDeferredPromise();
    const move = moveFn({ ...params, complete: resolve } as any);
    const tickSubscription: Subscription = loopService.tick$.subscribe(({ frameTime }: ILoopTimes): void => {
      // TODO (S.Panfilov) CWP what about delta time?
      // TODO (S.Panfilov) I'm not sure if this makes animation independent from frame rate. Need to test.
      move.tick(frameTime);
    });
    return promise.then(() => tickSubscription.unsubscribe());
  }

  function performMove(moveFn: IMoveFn, actor: IActorWrapper, destination: IMoveDestination, animationParams: IAnimationParams): Promise<void> {
    const params: Omit<IMoveFnParams, 'complete'> = { actor, destination: prepareDestination(destination, actor), animationParams };
    return performAction(moveFn, params);
  }

  function performMoveByPath(moveFn: IMoveByPathFn, actor: IActorWrapper, path: ReadonlyArray<IKeyframeDestination>, animationParams: IAnimationParams): Promise<void> {
    const params: Omit<IMoveByPathFnParams, 'complete'> = { actor, path: preparePathList(path, actor), animationParams };
    return performAction(moveFn, params);
  }

  return {
    goToPosition: (actor: IActorWrapper, destination: IMoveDestination, params: IAnimationParams): Promise<void> => performMove(goStraightMove, actor, destination, params),
    goByPath: (actor: IActorWrapper, path: ReadonlyArray<IKeyframeDestination>, params: IAnimationParams): Promise<void> => performMoveByPath(byPathMove, actor, path, params)
  };
}
