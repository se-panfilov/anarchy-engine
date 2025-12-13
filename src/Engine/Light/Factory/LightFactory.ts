import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Light/Adapter';
import { LightType } from '@/Engine/Light/Constants';
import type { IAmbientLightParams, IDirectionalLightParams, IHemisphereLightParams, ILightFactory, ILightParams, ILightWrapper, IPointLightParams, IRectAreaLightParams } from '@/Engine/Light/Models';
import { AmbientLightWrapper, DirectionalLightWrapper, HemisphereLightWrapper, PointLightWrapper, RectAreaLightWrapper } from '@/Engine/Light/Wrapper';

// TODO (S.Panfilov) type casting sucks (params as IAmbientLightParams, etc.)
function create(params: ILightParams): ILightWrapper | never {
  if (params.type === LightType.Ambient) return AmbientLightWrapper(params as IAmbientLightParams);
  if (params.type === LightType.Directional) return DirectionalLightWrapper(params as IDirectionalLightParams);
  if (params.type === LightType.Point) return PointLightWrapper(params as IPointLightParams);
  if (params.type === LightType.Hemisphere) return HemisphereLightWrapper(params as IHemisphereLightParams);
  if (params.type === LightType.RectArea) return RectAreaLightWrapper(params as IRectAreaLightParams);
  throw new Error(`Unsupported light type: ${params.type}`);
}

const factory: IReactiveFactory<ILightWrapper, ILightParams> = { ...ReactiveFactory(FactoryType.Light, create) };
export const LightFactory = (): ILightFactory => ({ ...factory, configToParams });
