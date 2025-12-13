import type { TActorParams, TActorWithPhysicsDependencies, TActorWrapperAsync, TActorWrapperWithPhysicsAsync } from '@/Engine/Actor/Models';
import type { TPhysicsBodyFacade, TPhysicsBodyService, TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import { makeWrapperWithPhysicsBody } from '@/Engine/Physics';
import { isNotDefined } from '@/Engine/Utils';

import { ActorWrapperAsync } from './ActorWrapperAsync';

export async function ActorWrapperWithPhysicsAsync(
  params: TActorParams,
  deps: TActorWithPhysicsDependencies,
  customCreatePhysicsBodyFn?: (physics: TWithPresetNamePhysicsBodyParams, physicsBodyService: TPhysicsBodyService, additionalParams?: Record<string, any>) => TPhysicsBodyFacade,
  additionalParams?: Record<string, any>
): Promise<TActorWrapperWithPhysicsAsync> | never {
  if (isNotDefined(params.physics)) throw new Error('Cannot create Actor with Physics: physics params are missing');
  const actorW: TActorWrapperAsync = await ActorWrapperAsync(params, deps);
  return makeWrapperWithPhysicsBody(actorW, params.physics, deps.physicsBodyService, customCreatePhysicsBodyFn, additionalParams);
}
