import type { ShadowMapType } from 'three';

export type TThreeJsRendererPropsAccessors = Readonly<{
  setShadowMapEnabled: (isShadowMapEnabled: boolean) => void;
  isShadowMapEnabled: () => boolean;
  setShadowMapType: (shadowMapType: ShadowMapType) => void;
  getShadowMapType: () => ShadowMapType;
}>;
