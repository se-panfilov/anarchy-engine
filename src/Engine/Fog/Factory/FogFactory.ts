import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { IFogFactory, IFogParams, IFogWrapper } from '@/Engine/Fog/Models';
import { FogWrapper } from '@/Engine/Fog/Wrapper';

const create = (params: IFogParams): IFogWrapper => FogWrapper(params, ambientContext.screenSizeWatcher);
const factory: IReactiveFactory<IFogWrapper, IFogParams> = { ...ReactiveFactory(FactoryType.Fog, create) };
export const FogFactory = (): IFogFactory => ({ ...factory });
