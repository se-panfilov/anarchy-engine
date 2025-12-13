import type { AnimationClip, Layers, Object3D } from 'three';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { IWithObject3d } from '@/Engine/Mixins/GameObject/Models';
import type { IWriteable } from '@/Engine/Utils';

export function withObject3d<T extends IWrapper<R>, R extends Object3D>(wrapper: T): IWithObject3d {
  // eslint-disable-next-line functional/immutable-data
  const setVisible = (visible: boolean): void => void ((wrapper.entity as IWriteable<R>).visible = visible);
  const getVisible = (): boolean => wrapper.entity.visible;

  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (castShadow: boolean): void => void ((wrapper.entity as IWriteable<R>).castShadow = castShadow);
  const getCastShadow = (): boolean => wrapper.entity.castShadow;

  // eslint-disable-next-line functional/immutable-data
  const setReceiveShadow = (receiveShadow: boolean): void => void ((wrapper.entity as IWriteable<R>).receiveShadow = receiveShadow);
  const getReceiveShadow = (): boolean => wrapper.entity.receiveShadow;

  // eslint-disable-next-line functional/immutable-data
  const setLayers = (layers: Layers): void => void ((wrapper.entity as IWriteable<R>).layers = layers);
  const getLayers = (): Layers => wrapper.entity.layers;

  // eslint-disable-next-line functional/immutable-data
  const setFrustumCulled = (frustumCulled: boolean): void => void ((wrapper.entity as IWriteable<R>).frustumCulled = frustumCulled);
  const getFrustumCulled = (): boolean => wrapper.entity.frustumCulled;

  // eslint-disable-next-line functional/immutable-data
  const setRenderOrder = (renderOrder: number): void => void ((wrapper.entity as IWriteable<R>).renderOrder = renderOrder);
  const getRenderOrder = (): number => wrapper.entity.renderOrder;

  // eslint-disable-next-line functional/immutable-data
  const setAnimations = (animations: ReadonlyArray<AnimationClip>): void => void ((wrapper.entity as IWriteable<R>).animations = animations as Array<AnimationClip>);
  const getAnimations = (): ReadonlyArray<AnimationClip> => wrapper.entity.animations;

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
