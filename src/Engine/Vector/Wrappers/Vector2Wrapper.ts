import { Vector2 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TWithCoordsXY } from '@/Engine/Mixins';
import { vectorMoveByXMixin, vectorMoveByYMixin } from '@/Engine/Vector/Mixins';
import type { TVector2Params } from '@/Engine/Vector/Models';

import type { TVector2, TVector2Wrapper } from '../Models';

export function Vector2Wrapper(params: TVector2Params): TVector2Wrapper {
  const entity: TVector2 = new Vector2(params.x, params.y);

  function getCoords(): TWithCoordsXY {
    return { x: entity.x, y: entity.y };
  }

  return {
    ...AbstractWrapper(entity, WrapperType.Vector2),
    ...vectorMoveByXMixin(entity),
    ...vectorMoveByYMixin(entity),
    getCoords,
    entity
  };
}
