import type { TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { THasPhysicsBody } from '@/Engine/Physics/Models';
import { isDefined } from '@/Engine/Utils';

export const isActorHasPhysicsBody = (actor: TActorWrapperAsync | THasPhysicsBody<TActorWrapperAsync>): actor is THasPhysicsBody<TActorWrapperAsync> => isDefined(actor.physicsBody);
