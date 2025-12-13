import type { TRotatableX, IWithRotationProperty } from '@/Engine/Mixins/GameObjects/Models';

import { withRotationMixin } from './WithRotationMixin';

export function withRotationByXMixin(entity: IWithRotationProperty): TRotatableX {
  const setRotationX = (x: number): void => void entity.rotation.set(x, entity.rotation.y, entity.rotation.z);
  const getRotationX = (): number => entity.rotation.x;
  const adjustRotationByX = (x: number): void => void entity.rotation.set(entity.rotation.x + x, entity.rotation.y, entity.rotation.z);

  return {
    ...withRotationMixin(entity),
    setRotationX,
    getRotationX,
    adjustRotationByX
  };
}
