import type { TPhysicsBodyParams } from '@Anarchy/Engine/Physics/Models';
import type { TOptional } from '@hellpig/anarchy-shared/Utils';
import { isDefined } from '@hellpig/anarchy-shared/Utils';

export function isPhysicsBodyParamsComplete(params: TPhysicsBodyParams | TOptional<TPhysicsBodyParams>): params is TPhysicsBodyParams {
  return isDefined(params.type) && isDefined(params.collisionShape) && isDefined(params.shapeParams);
}
