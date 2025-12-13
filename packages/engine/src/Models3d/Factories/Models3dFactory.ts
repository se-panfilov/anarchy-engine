import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParams } from '@/Models3d/Adapters';
import { Model3d } from '@/Models3d/Entities';
import type { TModel3d, TModel3dParams, TModels3dFactory, TModels3dServiceDependencies } from '@/Models3d/Models';

export function Models3dFactory(): TModels3dFactory {
  const factory: TReactiveFactory<TModel3d, TModel3dParams, Pick<TModels3dServiceDependencies, 'animationsService' | 'model3dRawToModel3dConnectionRegistry'>> = ReactiveFactory(
    FactoryType.Models3d,
    Model3d
  );

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
