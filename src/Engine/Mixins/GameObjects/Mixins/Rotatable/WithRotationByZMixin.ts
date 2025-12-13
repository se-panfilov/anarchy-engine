import type { TRotatableZ, IWithRotationProperty } from '@/Engine/Mixins/GameObjects/Models';

import { withRotationMixin } from './WithRotationMixin';

export function withRotationByZMixin(entity: IWithRotationProperty): TRotatableZ {
  const setRotationZ = (z: number): void => void entity.rotation.set(z, entity.rotation.y, entity.rotation.z);
  const getRotationZ = (): number => entity.rotation.z;
  const adjustRotationByZ = (z: number): void => void entity.rotation.set(entity.rotation.z + z, entity.rotation.y, entity.rotation.z);

  return {
    ...withRotationMixin(entity),
    setRotationZ,
    getRotationZ,
    adjustRotationByZ
  };
}
