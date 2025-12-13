import type { IWithRotationProperty, TRotatableY } from '@/Engine/Mixins/GameObjects/Models';

import { withRotationMixin } from './WithRotationMixin';

export function withRotationByYMixin(entity: IWithRotationProperty): TRotatableY {
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
