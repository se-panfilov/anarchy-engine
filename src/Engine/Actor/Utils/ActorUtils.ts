import type { TActorDependencies, TActorWithPhysicsDependencies, TActorWrapperAsync, TActorWrapperWithPhysicsAsync } from '@/Engine/Actor/Models';
import { isDefined } from '@/Engine/Utils';

export const isActorHasPhysicsBody = (actor: TActorWrapperAsync | TActorWrapperWithPhysicsAsync): actor is TActorWrapperWithPhysicsAsync => isDefined(actor.physicsBody);

export function isBodyServiceDependency(dependencies: TActorDependencies | TActorWithPhysicsDependencies): dependencies is TActorWithPhysicsDependencies {
  return isDefined((dependencies as TActorWithPhysicsDependencies).physicsBodyService);
}
