import type { TAbstractLightConfig, TAbstractLightWrapper, TLight } from '@/Engine/Light/Models';

export function entityToConfig<T extends TLight>(entity: TAbstractLightWrapper<T>): TAbstractLightConfig<T> {
  // TODO 15-0-0: implement
  // TODO 15-0-0: implement distinct adapters for AbstractLightWrapper, AmbientLightWrapper,DirectionalLightWrapper, HemisphereLightWrapper, PointLightWrapper, RectAreaLightWrapper, SpotLightWrapper,

  return {};
}
