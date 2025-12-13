import anime from 'animejs';

import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { ILoopService } from '@/Engine/Domains/Loop';
import type { IMovableXYZ, IWithCoordsXYZ, IWithPosition } from '@/Engine/Mixins';
import { defaultMoverServiceConfig } from '@/Engine/Services/MoverService/Constants';
import type { IAnimationParams, IFollowTargetParams, IKeyframeDestination, IMoverServiceConfig, IStopMoveCb } from '@/Engine/Services/MoverService/Models';
import type { IMoveDestination } from '@/Engine/Services/MoverService/Models/IMoveDestination';
import type { IMoverService } from '@/Engine/Services/MoverService/Models/IMoverService';
import { getAccumulatedKeyframes, performMove, performMoveUntil, prepareDestination } from '@/Engine/Services/MoverService/MoverServiceUtils';
import { byPathMove, followTarget, goStraightMove } from '@/Engine/Services/MoverService/MoveSet';

export function MoverService(loopService: ILoopService, { suspendWhenDocumentHidden }: IMoverServiceConfig = defaultMoverServiceConfig): IMoverService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
  (anime as any).suspendWhenDocumentHidden = suspendWhenDocumentHidden;

  return {
    goToPosition: (actor: IActorWrapper, destination: IMoveDestination, animationParams: IAnimationParams): Promise<void> => {
      return performMove(goStraightMove, loopService, { actor, destination: prepareDestination(destination, actor), animationParams });
    },
    goByPath: (actor: IActorWrapper, path: ReadonlyArray<IKeyframeDestination>, animationParams: IAnimationParams): Promise<void> => {
      return performMove(byPathMove, loopService, { actor, path: getAccumulatedKeyframes(path, actor), animationParams });
    },
    followTarget: (obj: IMovableXYZ, target: IWithPosition, offset?: Partial<IWithCoordsXYZ>): IStopMoveCb => {
      return performMoveUntil(followTarget, loopService, { obj, target, offset } satisfies IFollowTargetParams);
    }
  };
}
