import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Models3d/Adapters';
import type { TModel3dFacade, TModel3dParams, TModels3dFactory, TModels3dServiceDependencies } from '@/Engine/Models3d/Models';
import { Model3dFacade } from '@/Engine/Models3d/Wrappers';

const factory: TReactiveFactoryWithDependencies<
  TModel3dFacade,
  TModel3dParams,
  Pick<TModels3dServiceDependencies, 'animationsService' | 'model3dToModel3dFacadeConnectionRegistry'>
> = ReactiveFactoryWithDependencies(FactoryType.Models3d, Model3dFacade);
export const Models3dFactory = (): TModels3dFactory => ({ ...factory, configToParams });
