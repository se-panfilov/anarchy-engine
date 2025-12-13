import type { CameraParams } from '@Engine/Models';
import { CameraWrapper } from '@Engine/Wrappers';
import { cameraAdapter } from '@Engine/Adapters';
import type { ICameraFactory, ICreateCameraFn } from './Models';
import { AbstractFactory } from '@Engine/Factories';

const create: ICreateCameraFn = (params: CameraParams): ReturnType<typeof CameraWrapper> => CameraWrapper(params);

export const CameraFactory = (): ICameraFactory => AbstractFactory('camera', create, cameraAdapter);
