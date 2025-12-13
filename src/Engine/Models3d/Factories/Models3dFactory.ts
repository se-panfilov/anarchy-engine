import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Models3d/Adapters';
import type { TModel3dFacade, TModel3dParams, TModels3dFactory, TModels3dServiceDependencies } from '@/Engine/Models3d/Models';
import { Model3dFacade } from '@/Engine/Models3d/Wrappers';

// TODO 9.0.0. RESOURCES: do we need this create wrapper function?
// function createModel(params: TModel3dParams, dependencies: TModel3dFacadeDependencies): TModel3dFacade {
//   return Model3dFacade(params, dependencies);
// }

const factory: TReactiveFactoryWithDependencies<TModel3dFacade, TModel3dParams, Pick<TModels3dServiceDependencies, 'animationsService'>> = ReactiveFactory(FactoryType.Models3d, Model3dFacade);
export const Models3dFactory = (): TModels3dFactory => ({ ...factory, configToParams });
