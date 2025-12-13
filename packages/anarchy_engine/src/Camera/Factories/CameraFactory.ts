import type { TReactiveFactory } from '@Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Abstract';
import { configToParamsCamera } from '@Engine/Camera/Adapters';
import type { TAnyCameraParams, TAnyCameraWrapper, TCameraFactory, TCameraServiceDependencies } from '@Engine/Camera/Models';
import { isOrthographicCameraParams, isPerspectiveCameraParams } from '@Engine/Camera/Utils';
import { OrthographicCameraWrapper, PerspectiveCameraWrapper } from '@Engine/Camera/Wrappers';

function create(params: TAnyCameraParams, deps: TCameraServiceDependencies): TAnyCameraWrapper | never {
  if (isPerspectiveCameraParams(params)) return PerspectiveCameraWrapper(params, deps);
  if (isOrthographicCameraParams(params)) return OrthographicCameraWrapper(params, deps);
  else throw new Error(`[CameraFactory]: Cannot create camera from params: unknown camera type "${(params as any).type}"`);
}

export function CameraFactory(): TCameraFactory {
  const factory: TReactiveFactory<TAnyCameraWrapper, TAnyCameraParams, TCameraServiceDependencies> = ReactiveFactory(FactoryType.Camera, create);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: configToParamsCamera });
}
