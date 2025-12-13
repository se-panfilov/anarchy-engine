import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Camera/Adapters';
import type { TCameraFactory, TCameraParams, TCameraServiceDependencies, TCameraWrapper } from '@/Engine/Camera/Models';
import { CameraWrapper } from '@/Engine/Camera/Wrappers';

const factory: TReactiveFactoryWithDependencies<TCameraWrapper, TCameraParams, TCameraServiceDependencies> = ReactiveFactoryWithDependencies(FactoryType.Camera, CameraWrapper);
// eslint-disable-next-line functional/immutable-data
export const CameraFactory = (): TCameraFactory => Object.assign(factory, { configToParams });
