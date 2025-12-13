import { Vector4 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { IWithCoordsXYZW } from '@/Engine/Mixins';
import { vectorMoveByXMixin, vectorMoveByYMixin } from '@/Engine/Wrappers/Vector2Wrapper';
import { vectorMoveByZMixin } from '@/Engine/Wrappers/Vector3Wrapper/Mixins';
import { vectorMoveByWMixin } from '@/Engine/Wrappers/Vector4Wrapper/Mixins';

import type { IVector4, IVector4Params, IVector4Wrapper } from './Models';

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
