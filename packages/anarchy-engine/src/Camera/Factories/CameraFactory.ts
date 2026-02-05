import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { configToParamsCamera } from '@hellpig/anarchy-engine/Camera/Adapters';
import type { TAnyCameraParams, TAnyCameraWrapper, TCameraFactory, TCameraServiceDependencies } from '@hellpig/anarchy-engine/Camera/Models';
import { isOrthographicCameraParams, isPerspectiveCameraParams } from '@hellpig/anarchy-engine/Camera/Utils';
import { OrthographicCameraWrapper, PerspectiveCameraWrapper } from '@hellpig/anarchy-engine/Camera/Wrappers';

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
