import { Vector3 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TWithCoordsXYZ } from '@/Engine/Mixins';
import { vectorMoveByXMixin, vectorMoveByYMixin } from '@/Engine/Vector';
import { vectorMoveByZMixin } from '@/Engine/Vector/Mixins';
import type { TVector3, TVector3Params, TVector3Wrapper } from '@/Engine/Vector/Models';

export function Vector3Wrapper(params: TVector3Params): TVector3Wrapper {
  const entity: TVector3 = new Vector3(params.x, params.y, params.z);

  function getCoords(): TWithCoordsXYZ {
    return { x: entity.x, y: entity.y, z: entity.z };
  }

  return {
    ...AbstractWrapper(entity, WrapperType.Vector3),
    ...vectorMoveByXMixin(entity),
    ...vectorMoveByYMixin(entity),
    ...vectorMoveByZMixin(entity),
    getCoords,
    entity
  };
}
