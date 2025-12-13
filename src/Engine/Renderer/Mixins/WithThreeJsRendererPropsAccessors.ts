import type { ShadowMapType, WebGLRenderer } from 'three';

import type { TThreeJsRendererPropsAccessors } from '@/Engine/Renderer/Models';

export function withThreeJsRendererPropsAccessors(entity: WebGLRenderer): TThreeJsRendererPropsAccessors {
  // eslint-disable-next-line functional/immutable-data
  const setShadowMapEnabled = (isShadowMapEnabled: boolean): void => void (entity.shadowMap.enabled = isShadowMapEnabled);
  const isShadowMapEnabled = (): boolean => entity.shadowMap.enabled;

  // eslint-disable-next-line functional/immutable-data
  const setShadowMapType = (shadowMapType: ShadowMapType): void => void (entity.shadowMap.type = shadowMapType);
  const getShadowMapType = (): ShadowMapType => entity.shadowMap.type;

  return {
    setShadowMapEnabled,
    isShadowMapEnabled,
    setShadowMapType,
    getShadowMapType
  };
}
