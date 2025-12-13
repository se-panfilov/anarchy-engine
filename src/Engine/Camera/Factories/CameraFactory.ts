import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Camera/Adapters';
import type { ICameraFactory, ICameraParams, ICameraWrapper } from '@/Engine/Camera/Models';
import { CameraWrapper } from '@/Engine/Camera/Wrappers';

const factory: IReactiveFactory<ICameraWrapper, ICameraParams> = { ...ReactiveFactory(FactoryType.Camera, CameraWrapper) };
export const CameraFactory = (): ICameraFactory => ({ ...factory, configToParams });
