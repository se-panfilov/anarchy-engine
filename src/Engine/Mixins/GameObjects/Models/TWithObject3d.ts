export type TWithObject3d = Readonly<{
  setVisible: (visible: boolean) => void;
  getVisible: () => boolean;
  setCastShadow: (castShadow: boolean) => void;
  getCastShadow: () => boolean;
  setReceiveShadow: (receiveShadow: boolean) => void;
  getReceiveShadow: () => boolean;
  setFrustumCulled: (frustumCulled: boolean) => void;
  getFrustumCulled: () => boolean;
  setRenderOrder: (renderOrder: number) => void;
  getRenderOrder: () => number;
}>;
