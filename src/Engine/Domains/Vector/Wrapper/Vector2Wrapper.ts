import { Vector2 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import { vectorMoveByXMixin, vectorMoveByYMixin } from '@/Engine/Domains/Vector/Mixins';
import type { IVector2Params } from '@/Engine/Domains/Vector/Models';
import type { IWithCoordsXY } from '@/Engine/Mixins';

import type { IVector2, IVector2Wrapper } from '../Models';

export function Vector2Wrapper(params: IVector2Params): IVector2Wrapper {
  const entity: IVector2 = new Vector2(params.x, params.y);

  function getCoords(): IWithCoordsXY {
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
