import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Camera/Adapters';
import type { TAnyCameraParams, TAnyCameraWrapper, TCameraFactory, TCameraServiceDependencies } from '@/Engine/Camera/Models';
import { isOrthographicCamera, isPerspectiveCamera } from '@/Engine/Camera/Utils';
import { OrthographicCameraWrapper, PerspectiveCameraWrapper } from '@/Engine/Camera/Wrappers';

function create(params: TAnyCameraParams, deps: TCameraServiceDependencies): TAnyCameraWrapper | never {
  if (isPerspectiveCamera(params)) return PerspectiveCameraWrapper(params, deps);
  if (isOrthographicCamera(params)) return OrthographicCameraWrapper(params, deps);
  else throw new Error(`[CameraFactory]: Cannot create camera from params: unknown camera type "${params.type}"`);
}

export function CameraFactory(): TCameraFactory {
  const factory: TReactiveFactory<TAnyCameraWrapper, TAnyCameraParams, TCameraServiceDependencies> = ReactiveFactory(FactoryType.Camera, create);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
