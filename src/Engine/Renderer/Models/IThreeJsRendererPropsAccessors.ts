import type { ShadowMapType } from 'three';

export type IThreeJsRendererPropsAccessors = Readonly<{
  setShadowMapEnabled: (isShadowMapEnabled: boolean) => void;
  isShadowMapEnabled: () => boolean;
  setShadowMapType: (shadowMapType: ShadowMapType) => void;
  getShadowMapType: () => ShadowMapType;
}>;
