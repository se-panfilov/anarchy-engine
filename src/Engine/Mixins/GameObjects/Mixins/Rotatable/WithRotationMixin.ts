import type { Euler } from 'three';

import type { TWithRotation, TWithRotationProperty } from '@/Engine/Mixins/GameObjects/Models';

export function withRotationMixin(entity: TWithRotationProperty): TWithRotation {
  const setRotation = (x: number, y: number, z: number): Euler => EulerWrapper(entity.rotation.set(x, y, z));
  const getRotation = (): Euler => EulerWrapper(entity.rotation);
  return {
    setRotation,
    getRotation
  };
}
