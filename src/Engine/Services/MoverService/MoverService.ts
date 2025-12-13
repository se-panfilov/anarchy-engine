import anime from 'animejs';
import type { Vector3 } from 'three';

import { defaultMoverServiceConfig } from '@/Engine/Services/MoverService/Constants';
import type { TAnimationParams, TFollowTargetParams, TKeyframeDestination, TMoverServiceConfig, TStopMoveCb } from '@/Engine/Services/MoverService/Models';
import type { TMoveDestination } from '@/Engine/Services/MoverService/Models/TMoveDestination';
import type { TMoverService } from '@/Engine/Services/MoverService/Models/TMoverService';
import { getAccumulatedKeyframes, performMove, performMoveUntil, prepareDestination } from '@/Engine/Services/MoverService/MoverServiceUtils';
import { byPathMove, followTarget, goStraightMove } from '@/Engine/Services/MoverService/MoveSet';
import type { TTransformLoop, TWithConnectedTransformAgent, TWithTransformDrive } from '@/Engine/TransformDrive';
import { TransformAgent } from '@/Engine/TransformDrive';

export function MoverService(transformLoop: TTransformLoop, { suspendWhenDocumentHidden }: TMoverServiceConfig = defaultMoverServiceConfig): TMoverService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
  (anime as any).suspendWhenDocumentHidden = suspendWhenDocumentHidden;

  return {
    goToPosition: (obj: TWithTransformDrive<TWithConnectedTransformAgent>, destination: TMoveDestination, animationParams: TAnimationParams): Promise<void> => {
      if (obj.drive.getActiveAgent()?.type !== TransformAgent.Connected) throw new Error('Mover Service: moving object must have an active agent of the "connected" type');
      return performMove(goStraightMove, transformLoop, { obj, destination: prepareDestination(destination, obj), animationParams });
    },
    goByPath: (obj: TWithTransformDrive<TWithConnectedTransformAgent>, path: ReadonlyArray<TKeyframeDestination>, animationParams: TAnimationParams): Promise<void> => {
      if (obj.drive.getActiveAgent()?.type !== TransformAgent.Connected) throw new Error('Mover Service: moving object must have an active agent of the "connected" type');
      return performMove(byPathMove, transformLoop, { obj, path: getAccumulatedKeyframes(path, obj), animationParams });
    },
    followTarget: (obj: TWithTransformDrive<TWithConnectedTransformAgent>, target: TWithTransformDrive<any>, offset?: Partial<Vector3>): TStopMoveCb => {
      if (obj.drive.getActiveAgent()?.type !== TransformAgent.Connected) throw new Error('Mover Service: moving object must have an active agent of the "connected" type');
      return performMoveUntil(followTarget, transformLoop, { obj, target, offset } satisfies TFollowTargetParams);
    }
  };
}
