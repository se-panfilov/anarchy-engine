import { cameraAdapter } from '@Engine/Adapters';
import { ambientContext } from '@Engine/Context';
import type { ICameraParams } from '@Engine/Models';
import type { ICameraWrapper } from '@Engine/Wrappers';
import { CameraWrapper } from '@Engine/Wrappers';

import { AbstractFromConfigFactory } from '../AbstractFactory';
import type { ICameraFactory, ICreateCameraFn } from './Models';

const create: ICreateCameraFn = (params: ICameraParams): ICameraWrapper => CameraWrapper(params, ambientContext.screenSizeWatcher);
export const CameraFactory = (): ICameraFactory => AbstractFromConfigFactory('camera', create, cameraAdapter);
