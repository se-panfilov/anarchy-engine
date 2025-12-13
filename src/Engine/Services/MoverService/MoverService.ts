import anime from 'animejs';
import type { Vector3 } from 'three';

import type { TLoopService } from '@/Engine/Loop';
import { defaultMoverServiceConfig } from '@/Engine/Services/MoverService/Constants';
import type { TAnimationParams, TFollowTargetParams, TKeyframeDestination, TMoverServiceConfig, TStopMoveCb } from '@/Engine/Services/MoverService/Models';
import type { TMoveDestination } from '@/Engine/Services/MoverService/Models/TMoveDestination';
import type { TMoverService } from '@/Engine/Services/MoverService/Models/TMoverService';
import { getAccumulatedKeyframes, performMove, performMoveUntil, prepareDestination } from '@/Engine/Services/MoverService/MoverServiceUtils';
import { byPathMove, followTarget, goStraightMove } from '@/Engine/Services/MoverService/MoveSet';
import type { TWithConnectedTransformAgent, TWithTransformDrive } from '@/Engine/TransformDrive';

export function MoverService(loopService: TLoopService, { suspendWhenDocumentHidden }: TMoverServiceConfig = defaultMoverServiceConfig): TMoverService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
  (anime as any).suspendWhenDocumentHidden = suspendWhenDocumentHidden;

  return {
    goToPosition: (obj: TWithTransformDrive<TWithConnectedTransformAgent>, destination: TMoveDestination, animationParams: TAnimationParams): Promise<void> => {
      return performMove(goStraightMove, loopService, { obj, destination: prepareDestination(destination, obj), animationParams });
    },
    goByPath: (obj: TWithTransformDrive<TWithConnectedTransformAgent>, path: ReadonlyArray<TKeyframeDestination>, animationParams: TAnimationParams): Promise<void> => {
      return performMove(byPathMove, loopService, { obj, path: getAccumulatedKeyframes(path, obj), animationParams });
    },
    followTarget: (obj: TWithTransformDrive<TWithConnectedTransformAgent>, target: TWithTransformDrive<any>, offset?: Partial<Vector3>): TStopMoveCb => {
      return performMoveUntil(followTarget, loopService, { obj, target, offset } satisfies TFollowTargetParams);
    }
  };
}
