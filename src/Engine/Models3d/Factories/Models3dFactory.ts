import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Models3d/Adapters';
import { Model3d } from '@/Engine/Models3d/Entities';
import type { TModel3d, TModel3dParams, TModels3dFactory, TModels3dServiceDependencies } from '@/Engine/Models3d/Models';

const factory: TReactiveFactoryWithDependencies<
  TModel3d,
  TModel3dParams,
  Pick<TModels3dServiceDependencies, 'animationsService' | 'model3dRawToModel3dConnectionRegistry'>
> = ReactiveFactoryWithDependencies(FactoryType.Models3d, Model3d);
// eslint-disable-next-line functional/immutable-data
export const Models3dFactory = (): TModels3dFactory => Object.assign(factory, { configToParams });
