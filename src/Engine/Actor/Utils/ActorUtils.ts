import type { TActorDependencies, TActorWithPhysicsDependencies, TActorWrapper, TActorWrapperWithPhysics } from '@/Engine/Actor/Models';
import { isDefined } from '@/Engine/Utils';

export const isActorHasPhysicsBody = (actor: TActorWrapper | TActorWrapperWithPhysics): actor is TActorWrapperWithPhysics => isDefined(actor.physicsBody);

export function isBodyServiceDependency(dependencies: TActorDependencies | TActorWithPhysicsDependencies): dependencies is TActorWithPhysicsDependencies {
  return isDefined((dependencies as TActorWithPhysicsDependencies).physicsBodyService);
}
