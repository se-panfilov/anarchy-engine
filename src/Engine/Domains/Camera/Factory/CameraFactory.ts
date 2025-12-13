import { ambientContext } from '@Engine/Context';
import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { ICameraFactory, ICameraParams, ICameraWrapper, ICreateCameraFn } from '@Engine/Domains/Camera';
import { cameraAdapter, CameraWrapper } from '@Engine/Domains/Camera';

const create: ICreateCameraFn = (params: ICameraParams): ICameraWrapper => CameraWrapper(params, ambientContext.screenSizeWatcher);
export const CameraFactory = (): ICameraFactory => AbstractFromConfigWrapperFactory('camera', create, cameraAdapter);
