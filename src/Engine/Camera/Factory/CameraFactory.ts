import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Camera/Adapter';
import type { ICameraFactory, ICameraParams, ICameraWrapper } from '@/Engine/Camera/Models';
import { CameraWrapper } from '@/Engine/Camera/Wrapper';
import { ambientContext } from '@/Engine/Context';

const create = (params: ICameraParams): ICameraWrapper => CameraWrapper(params, ambientContext.screenSizeWatcher);
const factory: IReactiveFactory<ICameraWrapper, ICameraParams> = { ...ReactiveFactory(FactoryType.Camera, create) };
export const CameraFactory = (): ICameraFactory => ({ ...factory, configToParams });
