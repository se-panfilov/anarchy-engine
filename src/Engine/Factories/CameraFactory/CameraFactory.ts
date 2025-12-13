import type { ICameraFactory, ICreateCameraFn } from './Models';
import type { ICameraParams } from '@Engine/Models';
import { CameraWrapper } from '@Engine/Wrappers';
import type { ICameraWrapper } from '@Engine/Wrappers';
import { cameraAdapter } from '@Engine/Adapters';
import { AbstractFactory } from '../AbstractFactory';
import { ambientContext } from '@Engine/Context';

const create: ICreateCameraFn = (params: ICameraParams): ICameraWrapper =>
  CameraWrapper(params, ambientContext.screenSizeWatcher);
export const CameraFactory = (): ICameraFactory => AbstractFactory('camera', create, cameraAdapter);
