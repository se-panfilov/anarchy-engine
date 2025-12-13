import type { TWithObject3d } from '@/Mixins/GameObjects/Models';
import type { TObject3D } from '@/ThreeLib';
import type { TWriteable } from '@/Utils';

export function withObject3d<T extends TObject3D>(entity: T): TWithObject3d {
  // eslint-disable-next-line functional/immutable-data
  const setVisible = (visible: boolean): void => void ((entity as TWriteable<T>).visible = visible);
  const getVisible = (): boolean => entity.visible;

  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (castShadow: boolean): void => void ((entity as TWriteable<T>).castShadow = castShadow);
  const getCastShadow = (): boolean => entity.castShadow;

  // eslint-disable-next-line functional/immutable-data
  const setReceiveShadow = (receiveShadow: boolean): void => void ((entity as TWriteable<T>).receiveShadow = receiveShadow);
  const getReceiveShadow = (): boolean => entity.receiveShadow;

  // eslint-disable-next-line functional/immutable-data
  const setFrustumCulled = (frustumCulled: boolean): void => void ((entity as TWriteable<T>).frustumCulled = frustumCulled);
  const getFrustumCulled = (): boolean => entity.frustumCulled;

  // eslint-disable-next-line functional/immutable-data
  const setRenderOrder = (renderOrder: number): void => void ((entity as TWriteable<T>).renderOrder = renderOrder);
  const getRenderOrder = (): number => entity.renderOrder;

  return {
    setVisible,
    getVisible,
    setCastShadow,
    getCastShadow,
    setReceiveShadow,
    getReceiveShadow,
    setFrustumCulled,
    getFrustumCulled,
    setRenderOrder,
    getRenderOrder,
    layers: entity.layers
  };
}
