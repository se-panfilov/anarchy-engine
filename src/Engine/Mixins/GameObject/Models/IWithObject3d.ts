import type { AnimationClip, Layers } from 'three';

export type IWithObject3d = Readonly<{
  setVisible: (visible: boolean) => void;
  getVisible: () => boolean;
  setCastShadow: (castShadow: boolean) => void;
  getCastShadow: () => boolean;
  setReceiveShadow: (receiveShadow: boolean) => void;
  getReceiveShadow: () => boolean;
  setLayers: (layers: Layers) => void;
  getLayers: () => Layers;
  setFrustumCulled: (frustumCulled: boolean) => void;
  getFrustumCulled: () => boolean;
  setRenderOrder: (renderOrder: number) => void;
  getRenderOrder: () => number;
  setAnimations: (animations: ReadonlyArray<AnimationClip>) => void;
  getAnimations: () => ReadonlyArray<AnimationClip>;
}>;
