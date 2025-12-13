import type { TPhysicsBodyParams } from '@/Engine/Physics/Models';
import type { TOptional } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

// TODO (S.Panfilov) add unit tests
export function isPhysicsBodyParamsComplete(params: TPhysicsBodyParams | TOptional<TPhysicsBodyParams>): params is TPhysicsBodyParams {
  return isDefined(params.type) && isDefined(params.collisionShape) && isDefined(params.shapeParams);
}
