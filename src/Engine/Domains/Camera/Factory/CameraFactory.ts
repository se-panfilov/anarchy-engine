import { ambientContext } from '@/Engine/Context';
import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Domains/Abstract';
import { getParams } from '@/Engine/Domains/Camera/Adapter';
import type { ICameraFactory, ICameraParams, ICameraWrapper } from '@/Engine/Domains/Camera/Models';
import { CameraWrapper } from '@/Engine/Domains/Camera/Wrapper';

const create = (params: ICameraParams): ICameraWrapper => CameraWrapper(params, ambientContext.screenSizeWatcher);
const factory: IReactiveFactory<ICameraWrapper, ICameraParams> = { ...ReactiveFactory(FactoryType.Camera, create) };
export const CameraFactory = (): ICameraFactory => ({ ...factory, getParams });
