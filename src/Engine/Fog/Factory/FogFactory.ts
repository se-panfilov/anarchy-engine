import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Fog/Adapter';
import type { IFogFactory, IFogParams, IFogWrapper } from '@/Engine/Fog/Models';
import { FogWrapper } from '@/Engine/Fog/Wrapper';

const factory: IReactiveFactory<IFogWrapper, IFogParams> = { ...ReactiveFactory(FactoryType.Fog, FogWrapper) };
export const FogFactory = (): IFogFactory => ({ ...factory, configToParams });
