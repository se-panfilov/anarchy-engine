import { Vector2 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { IVector2Params } from '@/Engine/Wrappers';

import type { IVector2, IVector2Wrapper } from './Models';

export function Vector2Wrapper(params: IVector2Params): IVector2Wrapper {
  const entity: IVector2 = new Vector2(params.x, params.y);
  return { ...AbstractWrapper(entity, WrapperType.Vector2), entity };
}
