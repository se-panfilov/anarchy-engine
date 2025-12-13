import { Euler, Quaternion } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { eulerRotateByXMixin, eulerRotateByYMixin, eulerRotateByZMixin } from '@/Engine/Euler/Mixins';
import type { TWithCoordsXYZ } from '@/Engine/Mixins';

import type { TEuler, TEulerParams, TEulerWrapper } from '../Models';

export function EulerWrapper(params: TEulerParams): TEulerWrapper {
  const entity: TEuler = new Euler(params.x, params.y, params.z, params.order || 'XYZ');

  const getCoords = (): TWithCoordsXYZ => ({ x: entity.x, y: entity.y, z: entity.z });
  const toQuaternion = (): Quaternion => new Quaternion().setFromEuler(entity);

  return {
    ...AbstractWrapper(entity, WrapperType.Euler),
    ...eulerRotateByXMixin(entity),
    ...eulerRotateByYMixin(entity),
    ...eulerRotateByZMixin(entity),
    getCoords,
    toQuaternion,
    entity
  };
}
