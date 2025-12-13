import { Vector4 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IWithCoordsXYZW } from '@/Engine/Mixins';
import { vectorMoveByXMixin, vectorMoveByYMixin } from '@/Engine/Vector';
import { vectorMoveByWMixin, vectorMoveByZMixin } from '@/Engine/Vector/Mixins';
import type { IVector4, IVector4Params, IVector4Wrapper } from '@/Engine/Vector/Models';

export function Vector4Wrapper(params: IVector4Params): IVector4Wrapper {
  const entity: IVector4 = new Vector4(params.x, params.y, params.z, params.w);

  function getCoords(): IWithCoordsXYZW {
    return { x: entity.x, y: entity.y, z: entity.z, w: entity.w };
  }

  return {
    ...AbstractWrapper(entity, WrapperType.Vector4),
    ...vectorMoveByXMixin(entity),
    ...vectorMoveByYMixin(entity),
    ...vectorMoveByZMixin(entity),
    ...vectorMoveByWMixin(entity),
    getCoords,
    entity
  };
}
