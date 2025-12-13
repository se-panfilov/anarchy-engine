import { Euler } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { eulerRotateByXMixin, eulerRotateByYMixin, eulerRotateByZMixin } from '@/Engine/Euler/Mixins';

import type { TEuler, TEulerParams, TEulerWrapper } from '../Models';

export function EulerWrapper(params: TEulerParams): TEulerWrapper {
  const entity: TEuler = new Euler(params.x, params.y, params.z, params.order || 'XYZ');
  return {
    ...AbstractWrapper(entity, WrapperType.Euler),
    ...eulerRotateByXMixin(entity),
    ...eulerRotateByYMixin(entity),
    ...eulerRotateByZMixin(entity),
    entity
  };
}
