import type { TReactiveFactory } from '@Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Abstract';
import { configToParams } from '@Engine/Light/Adapters';
import { LightType } from '@Engine/Light/Constants';
import type { TLightFactory, TLightParams, TLightServiceDependencies, TLightWrapper } from '@Engine/Light/Models';
import { isAmbientLightParams, isDirectionalLightParams, isHemisphereLightParams, isPointLightParams, isRectAreaLightParams, isSpotLightParams } from '@Engine/Light/Utils';
import { AmbientLightWrapper, DirectionalLightWrapper, HemisphereLightWrapper, PointLightWrapper, RectAreaLightWrapper, SpotLightWrapper } from '@Engine/Light/Wrappers';

function create(params: TLightParams, dependencies: TLightServiceDependencies): TLightWrapper | never {
  if (params.type === LightType.Ambient && isAmbientLightParams(params)) return AmbientLightWrapper(params, dependencies);
  if (params.type === LightType.Directional && isDirectionalLightParams(params)) return DirectionalLightWrapper(params, dependencies);
  if (params.type === LightType.Point && isPointLightParams(params)) return PointLightWrapper(params, dependencies);
  if (params.type === LightType.Hemisphere && isHemisphereLightParams(params)) return HemisphereLightWrapper(params, dependencies);
  if (params.type === LightType.RectArea && isRectAreaLightParams(params)) return RectAreaLightWrapper(params, dependencies);
  if (params.type === LightType.Spot && isSpotLightParams(params)) return SpotLightWrapper(params, dependencies);
  throw new Error(`Unsupported light type: "${params.type}" or invalid params (does not match the light type)`);
}

export function LightFactory(): TLightFactory {
  const factory: TReactiveFactory<TLightWrapper, TLightParams, TLightServiceDependencies> = ReactiveFactory(FactoryType.Light, create);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
