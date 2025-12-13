import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from 'src/Engine/Fog/Adapters';
import type { IFogFactory, IFogParams, IFogWrapper } from '@/Engine/Fog/Models';
import { FogWrapper } from 'src/Engine/Fog/Wrappers';

const factory: IReactiveFactory<IFogWrapper, IFogParams> = { ...ReactiveFactory(FactoryType.Fog, FogWrapper) };
export const FogFactory = (): IFogFactory => ({ ...factory, configToParams });
