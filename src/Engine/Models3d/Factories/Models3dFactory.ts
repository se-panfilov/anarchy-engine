import type { TCreateEntityFactoryFn, TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Models3d/Adapters';
import type { TModel3dFacade, TModel3dParams, TModels3dFactory } from '@/Engine/Models3d/Models';
import { Model3dFacade } from '@/Engine/Models3d/Wrappers';

const factory: TReactiveFactory<TModel3dFacade, TModel3dParams> = {
  ...ReactiveFactory(FactoryType.Models3d, Model3dFacade as TCreateEntityFactoryFn<TModel3dFacade, TModel3dParams>)
};
export const Models3dFactory = (): TModels3dFactory => ({ ...factory, configToParams });
