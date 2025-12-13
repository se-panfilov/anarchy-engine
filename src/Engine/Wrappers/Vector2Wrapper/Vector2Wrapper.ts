import { Vector2 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { IWithCoordsXY } from '@/Engine/Mixins';
import type { IVector2Params } from '@/Engine/Wrappers';

import type { IVector2, IVector2Wrapper } from './Models';

export function Vector2Wrapper(params: IVector2Params): IVector2Wrapper {
  const entity: IVector2 = new Vector2(params.x, params.y);

  function getCoords(): IWithCoordsXY {
    return { x: entity.x, y: entity.y, z: entity.z };
  }

  return { ...AbstractWrapper(entity, WrapperType.Vector2), getCoords, entity };
}
