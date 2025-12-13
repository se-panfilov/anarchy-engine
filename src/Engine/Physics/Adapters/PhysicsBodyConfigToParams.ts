import { Vector4 } from 'three';

import type { TPhysicsBodyConfig, TPhysicsBodyParams } from '@/Engine/Physics/Models';
import { isPhysicsBodyParamsComplete } from '@/Engine/Physics/Utils';
import type { TOptional } from '@/Engine/Utils';

import { withCoordsToVector } from './Utils';

export function configToParamsBody(config: TPhysicsBodyConfig): TPhysicsBodyParams | never {
  const { position, rotation, ...rest } = config;

  const result: TPhysicsBodyParams | TOptional<TPhysicsBodyParams> = {
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...rest,
    ...withCoordsToVector(position, new Vector4(rotation?.x, rotation?.y, rotation?.z, rotation?.w))
  };

  if (!isPhysicsBodyParamsComplete(result)) throw new Error('Cannot create physics body: params are lacking of mandatory fields');
  return result;
}
