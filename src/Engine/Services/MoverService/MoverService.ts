import anime from 'animejs';

import type { ILoopService } from '@/Engine/Domains/Loop';
import type { IWithCoordsXYZ, IWithPosition } from '@/Engine/Mixins';
import { defaultMoverServiceConfig } from '@/Engine/Services/MoverService/Constants';
import type { IAnimationParams, IFollowTargetParams, IKeyframeDestination, IMovableEntityWrapper, IMoverServiceConfig, IStopMoveCb } from '@/Engine/Services/MoverService/Models';
import type { IMoveDestination } from '@/Engine/Services/MoverService/Models/IMoveDestination';
import type { IMoverService } from '@/Engine/Services/MoverService/Models/IMoverService';
import { getAccumulatedKeyframes, performMove, performMoveUntil, prepareDestination } from '@/Engine/Services/MoverService/MoverServiceUtils';
import { byPathMove, followTarget, goStraightMove } from '@/Engine/Services/MoverService/MoveSet';

export function MoverService(loopService: ILoopService, { suspendWhenDocumentHidden }: IMoverServiceConfig = defaultMoverServiceConfig): IMoverService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
  (anime as any).suspendWhenDocumentHidden = suspendWhenDocumentHidden;

  return {
    goToPosition: (obj: IMovableEntityWrapper, destination: IMoveDestination, animationParams: IAnimationParams): Promise<void> => {
      return performMove(goStraightMove, loopService, { obj, destination: prepareDestination(destination, obj), animationParams });
    },
    goByPath: (obj: IMovableEntityWrapper, path: ReadonlyArray<IKeyframeDestination>, animationParams: IAnimationParams): Promise<void> => {
      return performMove(byPathMove, loopService, { obj, path: getAccumulatedKeyframes(path, obj), animationParams });
    },
    followTarget: (obj: IMovableEntityWrapper, target: IWithPosition, offset?: Partial<IWithCoordsXYZ>): IStopMoveCb => {
      return performMoveUntil(followTarget, loopService, { obj, target, offset } satisfies IFollowTargetParams);
    }
  };
}
