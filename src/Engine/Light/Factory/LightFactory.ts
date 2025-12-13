import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Light/Adapter';
import type { ILightFactory, ILightParams, ILightWrapper } from '@/Engine/Light/Models';
import { LightWrapper } from '@/Engine/Light/Wrapper';

const factory: IReactiveFactory<ILightWrapper, ILightParams> = { ...ReactiveFactory(FactoryType.Light, LightWrapper) };
export const LightFactory = (): ILightFactory => ({ ...factory, configToParams });
