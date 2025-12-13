import { AbstractWrapper } from '@Engine/Wrappers';

import type { IVector3, IVector3Params, IVector3Wrapper } from './Models';
import { Vector3 } from 'three';

export function Vector3Wrapper(params: IVector3Params): IVector3Wrapper {
  const entity: IVector3 = new Vector3(params.x, params.y, params.z);
  return { ...AbstractWrapper(entity), entity };
}
