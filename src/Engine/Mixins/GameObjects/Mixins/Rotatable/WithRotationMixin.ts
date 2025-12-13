import { Euler } from 'three';

import type { TWithRotation, TWithRotationProperty } from '@/Engine/Mixins/GameObjects/Models';

export function withRotationMixin(entity: TWithRotationProperty): TWithRotation {
  const setRotation = (x: number, y: number, z: number): Euler => entity.rotation.set(x, y, z);
  const getRotation = (): Euler => new Euler(entity.rotation.x, entity.rotation.y, entity.rotation.z);

  return {
    setRotation,
    getRotation
  };
}
