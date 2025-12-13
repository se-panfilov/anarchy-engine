import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from 'src/Engine/Camera/Adapters';
import type { ICameraFactory, ICameraParams, ICameraWrapper } from '@/Engine/Camera/Models';
import { CameraWrapper } from 'src/Engine/Camera/Wrappers';

const factory: IReactiveFactory<ICameraWrapper, ICameraParams> = { ...ReactiveFactory(FactoryType.Camera, CameraWrapper) };
export const CameraFactory = (): ICameraFactory => ({ ...factory, configToParams });
