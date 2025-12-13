import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Light/Adapter';
import { LightType } from '@/Engine/Light/Constants';
import type { IAmbientLightParams, ILightFactory, ILightParams, ILightWrapper } from '@/Engine/Light/Models';
import { AmbientLightWrapper, DirectionalLightWrapper, PointLightWrapper } from '@/Engine/Light/Wrapper';

function create(params: ILightParams): ILightWrapper | never {
  if (params.type === LightType.Ambient) return AmbientLightWrapper(params);
  if (params.type === LightType.Directional) return DirectionalLightWrapper(params);
  if (params.type === LightType.Point) return PointLightWrapper(params);
  throw new Error(`Unsupported light type: ${params.type}`);
}

const factory: IReactiveFactory<ILightWrapper, IAmbientLightParams> = { ...ReactiveFactory(FactoryType.Light, create) };
export const LightFactory = (): ILightFactory => ({ ...factory, configToParams });
