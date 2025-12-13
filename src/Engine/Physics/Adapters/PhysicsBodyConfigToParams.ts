import { Euler, Quaternion } from 'three';
import { Vector3 } from 'three/src/math/Vector3';

import type { TPhysicsBodyConfig, TPhysicsBodyParams } from '@/Engine/Physics/Models';
import { isPhysicsBodyParamsComplete } from '@/Engine/Physics/Utils';
import type { TOptional } from '@/Engine/Utils';

export function configToParamsBody(config: TPhysicsBodyConfig): TPhysicsBodyParams | never {
  const { position, rotation, ...rest } = config;

  const result: TPhysicsBodyParams | TOptional<TPhysicsBodyParams> = {
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...rest,
    position: new Vector3(position.x, position.y, position.z),
    rotation: new Quaternion().setFromEuler(new Euler(rotation.x, rotation.y, rotation.z, rotation.order))
  };

  if (!isPhysicsBodyParamsComplete(result)) throw new Error('Cannot create physic body: params are lacking of mandatory fields');
  return result;
}
