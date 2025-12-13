import anime from 'animejs';

import type { TLoopService } from '@/Engine/Loop';
import type { TWithPosition3d, TWithCoordsXYZ } from '@/Engine/Mixins';
import { defaultMoverServiceConfig } from '@/Engine/Services/MoverService/Constants';
import type { IFollowTargetParams, IKeyframeDestination, IMovableEntityWrapper, IMoverServiceConfig, IStopMoveCb, TAnimationParams } from '@/Engine/Services/MoverService/Models';
import type { IMoveDestination } from '@/Engine/Services/MoverService/Models/IMoveDestination';
import type { TMoverService } from '@/Engine/Services/MoverService/Models/TMoverService';
import { getAccumulatedKeyframes, performMove, performMoveUntil, prepareDestination } from '@/Engine/Services/MoverService/MoverServiceUtils';
import { byPathMove, followTarget, goStraightMove } from '@/Engine/Services/MoverService/MoveSet';

export function MoverService(loopService: TLoopService, { suspendWhenDocumentHidden }: IMoverServiceConfig = defaultMoverServiceConfig): TMoverService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
  (anime as any).suspendWhenDocumentHidden = suspendWhenDocumentHidden;

  return {
    goToPosition: (obj: IMovableEntityWrapper, destination: IMoveDestination, animationParams: TAnimationParams): Promise<void> => {
      return performMove(goStraightMove, loopService, { obj, destination: prepareDestination(destination, obj), animationParams });
    },
    goByPath: (obj: IMovableEntityWrapper, path: ReadonlyArray<IKeyframeDestination>, animationParams: TAnimationParams): Promise<void> => {
      return performMove(byPathMove, loopService, { obj, path: getAccumulatedKeyframes(path, obj), animationParams });
    },
    followTarget: (obj: IMovableEntityWrapper, target: TWithPosition3d, offset?: Partial<TWithCoordsXYZ>): IStopMoveCb => {
      return performMoveUntil(followTarget, loopService, { obj, target, offset } satisfies IFollowTargetParams);
    }
  };
}
