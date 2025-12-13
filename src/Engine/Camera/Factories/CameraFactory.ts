import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Camera/Adapters';
import type { TCameraFactory, TCameraParams, TCameraServiceDependencies, TCameraWrapper } from '@/Engine/Camera/Models';
import { CameraWrapper } from '@/Engine/Camera/Wrappers';

export function CameraFactory(): TCameraFactory {
  const factory: TReactiveFactory<TCameraWrapper, TCameraParams, TCameraServiceDependencies> = ReactiveFactory(FactoryType.Camera, CameraWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
