import type { IRotatableY, IWithRotationProperty } from '@/Engine/Mixins/GameObject/Models';

import { withRotationMixin } from './WithRotationMixin';

export function withRotationByYMixin(entity: IWithRotationProperty): IRotatableY {
  const setRotationY = (y: number): void => void entity.rotation.set(y, entity.rotation.y, entity.rotation.z);
  const getRotationY = (): number => entity.rotation.y;
  const adjustRotationByY = (y: number): void => void entity.rotation.set(entity.rotation.y + y, entity.rotation.y, entity.rotation.z);

  return {
    ...withRotationMixin(entity),
    setRotationY,
    getRotationY,
    adjustRotationByY
  };
}
