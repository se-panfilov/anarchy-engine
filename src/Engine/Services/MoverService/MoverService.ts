import anime from 'animejs';

import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { ILoopWrapper } from '@/Engine/Domains/Loop';
import type { IWithCoords3 } from '@/Engine/Mixins';
import { defaultMoverServiceConfig } from '@/Engine/Services/MoverService/Constants';
import type { IAnimationParams, IMoverServiceConfig } from '@/Engine/Services/MoverService/Models';
import type { IMoverService } from '@/Engine/Services/MoverService/Models/IMoverService';
import { goToPosition } from '@/Engine/Services/MoverService/MoverServiceUtils';

// TODO (S.Panfilov) should be a service (MoveService) that uses LoopService

export function MoverService(loop: ILoopWrapper, { suspendWhenDocumentHidden }: IMoverServiceConfig = defaultMoverServiceConfig): IMoverService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
  (anime as any).suspendWhenDocumentHidden = suspendWhenDocumentHidden;

  return {
    goToPosition: (actor: IActorWrapper, targetPosition: IWithCoords3, params: IAnimationParams) => goToPosition(actor, targetPosition, params, loop)
  };
}
