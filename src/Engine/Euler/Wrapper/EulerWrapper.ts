import { Euler } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { eulerRotateByXMixin, eulerRotateByYMixin, eulerRotateByZMixin } from '@/Engine/Euler/Mixins';

import type { IEuler, IEulerParams, IEulerWrapper } from '../Models';

export function EulerWrapper(params: IEulerParams): IEulerWrapper {
  const entity: IEuler = new Euler(params.x, params.y, params.z, params.order || 'XYZ');
  return {
    ...AbstractWrapper(entity, WrapperType.Euler),
    ...eulerRotateByXMixin(entity),
    ...eulerRotateByYMixin(entity),
    ...eulerRotateByZMixin(entity),
    entity
  };
}
