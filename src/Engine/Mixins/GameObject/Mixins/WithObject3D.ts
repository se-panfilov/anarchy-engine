import type { AnimationClip, Layers } from 'three';

import type { IObject3D } from '@/Engine/Domains/ThreeLib';
import type { IWithObject3d } from '@/Engine/Mixins/GameObject/Models';
import type { IWriteable } from '@/Engine/Utils';

export function withObject3d<T extends IObject3D>(entity: T): IWithObject3d {
  // eslint-disable-next-line functional/immutable-data
  const setVisible = (visible: boolean): void => void ((entity as IWriteable<T>).visible = visible);
  const getVisible = (): boolean => entity.visible;

  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (castShadow: boolean): void => void ((entity as IWriteable<T>).castShadow = castShadow);
  const getCastShadow = (): boolean => entity.castShadow;

  // eslint-disable-next-line functional/immutable-data
  const setReceiveShadow = (receiveShadow: boolean): void => void ((entity as IWriteable<T>).receiveShadow = receiveShadow);
  const getReceiveShadow = (): boolean => entity.receiveShadow;

  // eslint-disable-next-line functional/immutable-data
  const setLayers = (layers: Layers): void => void ((entity as IWriteable<T>).layers = layers);
  const getLayers = (): Layers => entity.layers;

  // eslint-disable-next-line functional/immutable-data
  const setFrustumCulled = (frustumCulled: boolean): void => void ((entity as IWriteable<T>).frustumCulled = frustumCulled);
  const getFrustumCulled = (): boolean => entity.frustumCulled;

  // eslint-disable-next-line functional/immutable-data
  const setRenderOrder = (renderOrder: number): void => void ((entity as IWriteable<T>).renderOrder = renderOrder);
  const getRenderOrder = (): number => entity.renderOrder;

  // eslint-disable-next-line functional/immutable-data
  const setAnimations = (animations: ReadonlyArray<AnimationClip>): void => void ((entity as IWriteable<T>).animations = animations as Array<AnimationClip>);
  const getAnimations = (): ReadonlyArray<AnimationClip> => entity.animations;

  return {
    setVisible,
    getVisible,
    setCastShadow,
    getCastShadow,
    setReceiveShadow,
    getReceiveShadow,
    setLayers,
    getLayers,
    setFrustumCulled,
    getFrustumCulled,
    setRenderOrder,
    getRenderOrder,
    setAnimations,
    getAnimations
  };
}
