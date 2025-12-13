import type { CameraParams } from '@Engine/Models';
import { CameraWrapper, ICameraWrapper } from '@Engine/Wrappers';
import { cameraAdapter } from '@Engine/Adapters';
import type { ICameraFactory, ICreateCameraFn } from './Models';
import { AbstractFactory } from '../AbstractFactory';

const create: ICreateCameraFn = (params: CameraParams): ICameraWrapper => CameraWrapper(params);
export const CameraFactory = (): ICameraFactory => AbstractFactory('camera', create, cameraAdapter);
