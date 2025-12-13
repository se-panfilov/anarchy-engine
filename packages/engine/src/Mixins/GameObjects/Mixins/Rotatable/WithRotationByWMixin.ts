import type { TRotatableW, TWithQuaternionRotationProperty } from '@/Mixins/GameObjects/Models';

export function withQuaternionRotationByWMixin(entity: TWithQuaternionRotationProperty): TRotatableW {
  const setRotationW = (w: number): void => void entity.rotation.set(entity.rotation.x, entity.rotation.y, entity.rotation.z, w);
  const getRotationW = (): number => entity.rotation.w;
  const adjustRotationByW = (w: number): void => void entity.rotation.set(entity.rotation.x, entity.rotation.y, entity.rotation.z, entity.rotation.w + w);

  return {
    setRotationW,
    getRotationW,
    adjustRotationByW
  };
}
