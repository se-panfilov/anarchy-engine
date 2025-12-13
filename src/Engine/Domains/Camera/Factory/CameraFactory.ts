import { ambientContext } from '@Engine/Context';
import { cameraAdapter } from '@Engine/Domains/Camera/Adapter';
import type { ICameraFactory, ICameraParams, ICameraWrapper, ICreateCameraFn } from '@Engine/Domains/Camera/Models';
import { CameraWrapper } from '@Engine/Domains/Camera/Wrapper';
import { AbstractFromConfigWrapperFactory } from '@Engine/Factories';

const create: ICreateCameraFn = (params: ICameraParams): ICameraWrapper => CameraWrapper(params, ambientContext.screenSizeWatcher);
export const CameraFactory = (): ICameraFactory => AbstractFromConfigWrapperFactory('camera', create, cameraAdapter);
