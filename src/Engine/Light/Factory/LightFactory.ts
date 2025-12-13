import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Light/Adapter';
import { LightType } from '@/Engine/Light/Constants';
import type { ILightFactory, ILightParams, ILightWrapper } from '@/Engine/Light/Models';
import { isAmbientLightParams, isDirectionalLightParams, isHemisphereLightParams, isPointLightParams, isRectAreaLightParams } from '@/Engine/Light/Utils';
import { AmbientLightWrapper, DirectionalLightWrapper, HemisphereLightWrapper, PointLightWrapper, RectAreaLightWrapper } from '@/Engine/Light/Wrapper';

function create(params: ILightParams): ILightWrapper | never {
  if (params.type === LightType.Ambient && isAmbientLightParams(params)) return AmbientLightWrapper(params);
  if (params.type === LightType.Directional && isDirectionalLightParams(params)) return DirectionalLightWrapper(params);
  if (params.type === LightType.Point && isPointLightParams(params)) return PointLightWrapper(params);
  if (params.type === LightType.Hemisphere && isHemisphereLightParams(params)) return HemisphereLightWrapper(params);
  if (params.type === LightType.RectArea && isRectAreaLightParams(params)) return RectAreaLightWrapper(params);
  throw new Error(`Unsupported light type: "${params.type}" or invalid params (doest not match the light type)`);
}

const factory: IReactiveFactory<ILightWrapper, ILightParams> = { ...ReactiveFactory(FactoryType.Light, create) };
export const LightFactory = (): ILightFactory => ({ ...factory, configToParams });
