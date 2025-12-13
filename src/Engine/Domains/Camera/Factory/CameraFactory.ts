import { ambientContext } from '@Engine/Context';
import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';

import { cameraAdapter } from '../Adapter';
import type { ICameraFactory, ICameraParams, ICameraWrapper, ICreateCameraFn } from '../Models';
import { CameraWrapper } from '../Wrapper';

const create: ICreateCameraFn = (params: ICameraParams): ICameraWrapper => CameraWrapper(params, ambientContext.screenSizeWatcher);
export const CameraFactory = (): ICameraFactory => AbstractFromConfigWrapperFactory('camera', create, cameraAdapter);
