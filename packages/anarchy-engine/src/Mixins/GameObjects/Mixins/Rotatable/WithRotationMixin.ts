import type { TWithRotation, TWithRotationProperty } from '@Anarchy/Engine/Mixins/GameObjects/Models';
import { Euler } from 'three';

export function withRotationMixin(entity: TWithRotationProperty): TWithRotation {
  const setRotation = (x: number, y: number, z: number): Euler => entity.rotation.set(x, y, z);
  const getRotation = (): Euler => new Euler(entity.rotation.x, entity.rotation.y, entity.rotation.z);

  return {
    setRotation,
    getRotation
  };
}
