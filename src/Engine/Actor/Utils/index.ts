import type { TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TWithMandatoryPhysicsBody } from '@/Engine/Physics/Models';
import { isDefined } from '@/Engine/Utils';

export const isActorHasPhysicsBody = (actor: TActorWrapperAsync | TWithMandatoryPhysicsBody<TActorWrapperAsync>): actor is TWithMandatoryPhysicsBody<TActorWrapperAsync> =>
  isDefined(actor.physicsBody);
