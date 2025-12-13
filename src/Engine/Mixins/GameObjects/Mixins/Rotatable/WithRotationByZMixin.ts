import type { TRotatableZ, TWithRotationProperty } from '@/Engine/Mixins/GameObjects/Models';

export function withRotationByZMixin(entity: TWithRotationProperty): TRotatableZ {
  const setRotationZ = (z: number): void => void entity.rotation.set(z, entity.rotation.y, entity.rotation.z);
  const getRotationZ = (): number => entity.rotation.z;
  const adjustRotationByZ = (z: number): void => void entity.rotation.set(entity.rotation.x, entity.rotation.y, entity.rotation.z + z);

  return {
    setRotationZ,
    getRotationZ,
    adjustRotationByZ
  };
}
