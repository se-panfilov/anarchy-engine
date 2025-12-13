import type { TPhysicsBodyParams } from '@Anarchy/Engine/Physics/Models';
import type { TOptional } from '@Anarchy/Shared/Utils';
import { isDefined } from '@Anarchy/Shared/Utils';

export function isPhysicsBodyParamsComplete(params: TPhysicsBodyParams | TOptional<TPhysicsBodyParams>): params is TPhysicsBodyParams {
  return isDefined(params.type) && isDefined(params.collisionShape) && isDefined(params.shapeParams);
}
