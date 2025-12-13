import { Vector3 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IWithCoordsXYZ } from '@/Engine/Mixins';
import { vectorMoveByXMixin, vectorMoveByYMixin } from '@/Engine/Vector';
import { vectorMoveByZMixin } from '@/Engine/Vector/Mixins';
import type { IVector3, IVector3Params, IVector3Wrapper } from '@/Engine/Vector/Models';

export function Vector3Wrapper(params: IVector3Params): IVector3Wrapper {
  const entity: IVector3 = new Vector3(params.x, params.y, params.z);

  function getCoords(): IWithCoordsXYZ {
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
