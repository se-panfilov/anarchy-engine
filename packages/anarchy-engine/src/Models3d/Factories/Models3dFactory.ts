import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { model3dConfigToParams } from '@hellpig/anarchy-engine/Models3d/Adapters';
import { Model3d } from '@hellpig/anarchy-engine/Models3d/Entities';
import type { TModel3d, TModel3dParams, TModels3dFactory, TModels3dServiceDependencies } from '@hellpig/anarchy-engine/Models3d/Models';

export function Models3dFactory(): TModels3dFactory {
  const factory: TReactiveFactory<TModel3d, TModel3dParams, Pick<TModels3dServiceDependencies, 'animationsService' | 'model3dRawToModel3dConnectionRegistry'>> = ReactiveFactory(
    FactoryType.Models3d,
    Model3d
  );

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: model3dConfigToParams });
}
