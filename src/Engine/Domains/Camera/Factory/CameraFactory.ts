import { ambientContext } from '@Engine/Context';

import type { ICameraFactory, ICameraParams, ICameraWrapper, ICreateCameraFn } from '@Engine/Domains/Camera/Models';
import { cameraAdapter } from '@Engine/Domains/Camera/Adapter';
import { CameraWrapper } from '@Engine/Domains/Camera/Wrapper';
import { AbstractFromConfigWrapperFactory } from '@/Engine';

const create: ICreateCameraFn = (params: ICameraParams): ICameraWrapper => CameraWrapper(params, ambientContext.screenSizeWatcher);
export const CameraFactory = (): ICameraFactory => AbstractFromConfigWrapperFactory('camera', create, cameraAdapter);
