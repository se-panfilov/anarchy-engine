import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Fog/Adapters';
import type { IFogFactory, IFogParams, IFogWrapper } from '@/Engine/Fog/Models';
import { FogWrapper } from '@/Engine/Fog/Wrappers';

const factory: IReactiveFactory<IFogWrapper, IFogParams> = { ...ReactiveFactory(FactoryType.Fog, FogWrapper) };
export const FogFactory = (): IFogFactory => ({ ...factory, configToParams });
