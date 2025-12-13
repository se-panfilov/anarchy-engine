import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Domains/Abstract';
import { configToParams } from '@/Engine/Domains/Light/Adapter';
import type { ILightFactory, ILightParams, ILightWrapper } from '@/Engine/Domains/Light/Models';
import { LightWrapper } from '@/Engine/Domains/Light/Wrapper';

const factory: IReactiveFactory<ILightWrapper, ILightParams> = { ...ReactiveFactory(FactoryType.Light, LightWrapper) };
export const LightFactory = (): ILightFactory => ({ ...factory, configToParams });
