import type { TPhysicsBodyParams } from '@/Physics/Models';
import type { TOptional } from '@/Utils';
import { isDefined } from '@/Utils';

export function isPhysicsBodyParamsComplete(params: TPhysicsBodyParams | TOptional<TPhysicsBodyParams>): params is TPhysicsBodyParams {
  return isDefined(params.type) && isDefined(params.collisionShape) && isDefined(params.shapeParams);
}
