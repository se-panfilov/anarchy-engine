import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from 'src/Engine/Light/Adapters';
import { LightType } from '@/Engine/Light/Constants';
import type { ILightFactory, ILightParams, ILightWrapper } from '@/Engine/Light/Models';
import { isAmbientLightParams, isDirectionalLightParams, isHemisphereLightParams, isPointLightParams, isRectAreaLightParams, isSpotLightParams } from '@/Engine/Light/Utils';
import { AmbientLightWrapper, DirectionalLightWrapper, HemisphereLightWrapper, PointLightWrapper, RectAreaLightWrapper, SpotLightWrapper } from 'src/Engine/Light/Wrappers';

function create(params: ILightParams): ILightWrapper | never {
  if (params.type === LightType.Ambient && isAmbientLightParams(params)) return AmbientLightWrapper(params);
  if (params.type === LightType.Directional && isDirectionalLightParams(params)) return DirectionalLightWrapper(params);
  if (params.type === LightType.Point && isPointLightParams(params)) return PointLightWrapper(params);
  if (params.type === LightType.Hemisphere && isHemisphereLightParams(params)) return HemisphereLightWrapper(params);
  if (params.type === LightType.RectArea && isRectAreaLightParams(params)) return RectAreaLightWrapper(params);
  if (params.type === LightType.Spot && isSpotLightParams(params)) return SpotLightWrapper(params);
  throw new Error(`Unsupported light type: "${params.type}" or invalid params (doest not match the light type)`);
}

const factory: IReactiveFactory<ILightWrapper, ILightParams> = { ...ReactiveFactory(FactoryType.Light, create) };
export const LightFactory = (): ILightFactory => ({ ...factory, configToParams });
