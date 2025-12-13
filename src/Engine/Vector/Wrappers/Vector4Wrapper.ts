import { Vector4 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TWithCoordsXYZW } from '@/Engine/Mixins';
import { vectorMoveByXMixin, vectorMoveByYMixin } from '@/Engine/Vector';
import { vectorMoveByWMixin, vectorMoveByZMixin } from '@/Engine/Vector/Mixins';
import type { TVector4, TVector4Params, TVector4Wrapper } from '@/Engine/Vector/Models';

export function Vector4Wrapper(params: TVector4Params): TVector4Wrapper {
  const entity: TVector4 = new Vector4(params.x, params.y, params.z, params.w);

  function getCoords(): TWithCoordsXYZW {
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
