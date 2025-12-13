import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Models3d/Adapters';
import type { TModels3dFactory, TModels3dParams, TModels3dWrapper } from '@/Engine/Models3d/Models';
import { Models3dWrapper } from '@/Engine/Models3d/Wrappers';

const factory: TReactiveFactory<TModels3dWrapper, TModels3dParams> = { ...ReactiveFactory(FactoryType.Models3d, Models3dWrapper) };
export const Models3dFactory = (): TModels3dFactory => ({ ...factory, configToParams });
